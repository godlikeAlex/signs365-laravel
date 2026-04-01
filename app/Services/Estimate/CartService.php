<?php

namespace App\Services\Estimate;

use App\DTO\Estimate\AddToEstimateCartDTO;
use App\Models\EstimateField;
use App\Models\EstimateFieldOption;
use App\Models\EstimateForm;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class CartService
{
  private $cart;

  public function __construct(string $cartID)
  {
    $this->cart = \Cart::session($cartID);
  }

  public function instance()
  {
    return $this->cart;
  }

  public function add(AddToEstimateCartDTO $dto): void
  {
    $normalizedPayload = $this->normalizePayloadValue($dto->payload);

    $options = [
      "product" => [
        "id" => $dto->productID,
        "title" => $dto->title,
      ],
      "estimate_form_id" => $dto->formID,
      "estimate_form_ids" => $dto->formIDs,
      "payload" => is_array($normalizedPayload) ? $normalizedPayload : [],
    ];

    $id = md5($dto->productID . serialize($dto->formIDs) . serialize($options));

    $this->cart->add([
      "id" => $id,
      "name" => $dto->title,
      "quantity" => $dto->quantity,
      "price" => $dto->price,
      "attributes" => $options,
      "associatedModel" => null,
    ]);
  }

  private function normalizePayloadValue(mixed $value): mixed
  {
    if ($value instanceof UploadedFile) {
      $path = $value->store("estimate/cart", "public");

      return [
        "name" => $value->getClientOriginalName(),
        "path" => $path,
        "url" => Storage::disk("public")->url($path),
      ];
    }

    if (is_array($value)) {
      $normalized = [];

      foreach ($value as $key => $item) {
        $normalized[$key] = $this->normalizePayloadValue($item);
      }

      return $normalized;
    }

    return $value;
  }

  public function addQuantity(string $itemID): void
  {
    if (!$this->cart->has($itemID)) {
      return;
    }

    $this->cart->update($itemID, ["quantity" => +1]);
  }

  public function reduceQuantity(string $itemID): void
  {
    if (!$this->cart->has($itemID)) {
      return;
    }

    $this->cart->update($itemID, ["quantity" => -1]);
  }

  public function removeItem(string $itemID): void
  {
    if (!$this->cart->has($itemID)) {
      return;
    }

    $this->cart->remove($itemID);
  }

  public function clear(): void
  {
    $this->cart->clear();
  }

  public function format(): array
  {
    $cartItems = $this->cart
      ->getContent()
      ->sort()
      ->values();

    [$fieldsByID, $optionsByID] = $this->resolveFieldOptionMaps($cartItems);
    $formsByID = $this->resolveFormTitlesMap($cartItems);

    $items = $cartItems->map(function ($item) use (
      $fieldsByID,
      $optionsByID,
      $formsByID
    ) {
      $lockedLineTotal =
        (bool) ($item->attributes["payload"]["lock_line_total"] ?? false);
      $lineTotalInCents = $lockedLineTotal
        ? $item->attributes["payload"]["line_total_cents"] ?? null
        : null;

      if ($lineTotalInCents === null) {
        $formType = $item->attributes["payload"]["form_type"] ?? null;
        $lineTotalInCents =
          $formType === "per_qty"
            ? $item->price
            : $item->price * $item->quantity;
      }

      $attributes = $item->attributes;
      $payload = (array) ($attributes["payload"] ?? []);

      [
        $receiptRows,
        $selectedFieldsFlat,
      ] = $this->buildSelectedFieldsPresentation(
        $payload["selected_fields_by_form"] ?? [],
        $fieldsByID,
        $optionsByID
      );

      $payload["receipt_rows"] = $receiptRows;
      $payload["selected_fields_flat"] = $selectedFieldsFlat;
      $payload["service_titles"] = $this->buildServiceTitles(
        $payload,
        $formsByID
      );
      $attributes["payload"] = $payload;

      return [
        "id" => $item->id,
        "name" => $item->name,
        "quantity" => $item->quantity,
        "price" => round($item->price / 100, 2),
        "line_total" => round($lineTotalInCents / 100, 2),
        "attributes" => $attributes,
      ];
    });

    $subtotalInCents = $this->cart
      ->getContent()
      ->reduce(function ($carry, $item) {
        $lockedLineTotal =
          (bool) ($item->attributes["payload"]["lock_line_total"] ?? false);
        $lineTotalInCents = $lockedLineTotal
          ? $item->attributes["payload"]["line_total_cents"] ?? null
          : null;
        if ($lineTotalInCents !== null) {
          return $carry + (int) $lineTotalInCents;
        }

        $formType = $item->attributes["payload"]["form_type"] ?? null;

        if ($formType === "per_qty") {
          return $carry + $item->price;
        }

        return $carry + $item->price * $item->quantity;
      }, 0);

    return [
      "items" => $items->values(),
      "subtotal" => round($subtotalInCents / 100, 2),
      "total" => round($subtotalInCents / 100, 2),
      "amount_in_cents" => (int) round($subtotalInCents),
    ];
  }

  private function resolveFieldOptionMaps(Collection $cartItems): array
  {
    $fieldIDs = [];
    $optionIDs = [];

    foreach ($cartItems as $item) {
      $selectedFieldsByForm = (array) data_get(
        $item,
        "attributes.payload.selected_fields_by_form",
        []
      );

      foreach ($selectedFieldsByForm as $selectedFields) {
        if (!is_array($selectedFields)) {
          continue;
        }

        foreach ($selectedFields as $fieldData) {
          if (!is_array($fieldData)) {
            continue;
          }

          $fieldID = (int) ($fieldData["field_id"] ?? ($fieldData["id"] ?? 0));
          if ($fieldID > 0) {
            $fieldIDs[] = $fieldID;
          }

          $optionID = (int) ($fieldData["option_id"] ?? 0);
          if ($optionID > 0) {
            $optionIDs[] = $optionID;
          }
        }
      }
    }

    $fieldsByID = EstimateField::query()
      ->withTrashed()
      ->whereIn(
        "id",
        collect($fieldIDs)
          ->unique()
          ->values()
      )
      ->get(["id", "title", "cart_label"])
      ->keyBy("id");

    $optionsByID = EstimateFieldOption::query()
      ->withTrashed()
      ->whereIn(
        "id",
        collect($optionIDs)
          ->unique()
          ->values()
      )
      ->get(["id", "title"])
      ->keyBy("id");

    return [$fieldsByID, $optionsByID];
  }

  private function resolveFormTitlesMap(Collection $cartItems): Collection
  {
    $formIDs = [];

    foreach ($cartItems as $item) {
      $payload = (array) data_get($item, "attributes.payload", []);

      $singleFormID = (int) ($payload["estimate_form_id"] ?? 0);
      if ($singleFormID > 0) {
        $formIDs[] = $singleFormID;
      }

      $bundleFormIDs = $payload["estimate_form_ids"] ?? [];
      if (is_array($bundleFormIDs)) {
        foreach ($bundleFormIDs as $bundleFormID) {
          $bundleFormID = (int) $bundleFormID;
          if ($bundleFormID > 0) {
            $formIDs[] = $bundleFormID;
          }
        }
      }
    }

    return EstimateForm::query()
      ->withTrashed()
      ->whereIn(
        "id",
        collect($formIDs)
          ->unique()
          ->values()
      )
      ->get(["id", "title"])
      ->keyBy("id");
  }

  private function buildServiceTitles(
    array $payload,
    Collection $formsByID
  ): array {
    $resolved = [];

    $singleFormID = (int) ($payload["estimate_form_id"] ?? 0);
    if ($singleFormID > 0) {
      $title = $formsByID->get($singleFormID)?->title;
      if ($title) {
        $resolved[$singleFormID] = $title;
      }
    }

    $bundleFormIDs = $payload["estimate_form_ids"] ?? [];
    if (is_array($bundleFormIDs)) {
      foreach ($bundleFormIDs as $bundleFormID) {
        $bundleFormID = (int) $bundleFormID;
        if ($bundleFormID <= 0) {
          continue;
        }

        $title = $formsByID->get($bundleFormID)?->title;
        if ($title) {
          $resolved[$bundleFormID] = $title;
        }
      }
    }

    return $resolved;
  }

  private function buildSelectedFieldsPresentation(
    array $selectedFieldsByForm,
    Collection $fieldsByID,
    Collection $optionsByID
  ): array {
    $receiptRows = [];
    $receiptRowsByKey = [];
    $selectedFieldsFlat = [];

    foreach ($selectedFieldsByForm as $formID => $selectedFields) {
      $formID = (int) $formID;
      if (!is_array($selectedFields)) {
        continue;
      }

      foreach ($selectedFields as $fieldData) {
        if (!is_array($fieldData)) {
          continue;
        }

        $fieldID = (int) ($fieldData["field_id"] ?? ($fieldData["id"] ?? 0));
        if ($fieldID <= 0) {
          continue;
        }

        $optionID = (int) ($fieldData["option_id"] ?? 0);
        $field = $fieldsByID->get($fieldID);
        $option = $optionID > 0 ? $optionsByID->get($optionID) : null;

        $label = trim((string) ($field?->cart_label ?: $field?->title ?: ""));
        if ($label === "") {
          $label = "Field #{$fieldID}";
        }

        $rawValue = $fieldData["value"] ?? null;
        $normalized = $this->normalizeSelectedFieldValue($rawValue);

        $hasNormalizedValue =
          $normalized["value"] !== null || !empty($normalized["links"]);
        $isOptionIdentityValue =
          is_scalar($rawValue) && (int) $rawValue === $optionID;

        $value =
          $option && (!$hasNormalizedValue || $isOptionIdentityValue)
            ? $option->title
            : $normalized["value"];

        $rowLinks = $normalized["links"];

        $selectedFieldsFlat[] = [
          "form_id" => $formID,
          "field_id" => $fieldID,
          "option_id" => $optionID > 0 ? $optionID : null,
          "label" => $label,
          "value" => $value,
          "links" => $rowLinks,
        ];

        $row = [
          "form_id" => $formID,
          "field_id" => $fieldID,
          "option_id" => $optionID > 0 ? $optionID : null,
          "label" => $label,
          "value" => $value,
          "links" => $rowLinks,
        ];

        $rowKey = $formID . ":" . $fieldID . ":" . strtolower($label);

        if (!isset($receiptRowsByKey[$rowKey])) {
          $receiptRowsByKey[$rowKey] = $row;
          continue;
        }

        $existing = $receiptRowsByKey[$rowKey];
        $existingValue = trim((string) ($existing["value"] ?? ""));
        $rowValue = trim((string) ($row["value"] ?? ""));

        if ($existingValue === "" && $rowValue !== "") {
          $existing["value"] = $rowValue;
        }

        $mergedLinks = collect([
          ...((array) ($existing["links"] ?? [])),
          ...((array) ($row["links"] ?? [])),
        ])
          ->filter(fn($link) => is_array($link) && !empty($link["url"]))
          ->unique(fn($link) => (string) ($link["url"] ?? ""))
          ->values()
          ->all();

        $existing["links"] = $mergedLinks;
        $receiptRowsByKey[$rowKey] = $existing;
      }
    }

    $receiptRows = array_values($receiptRowsByKey);

    return [$receiptRows, $selectedFieldsFlat];
  }

  private function normalizeSelectedFieldValue(mixed $value): array
  {
    $result = [
      "value" => null,
      "links" => [],
    ];

    if ($value === null) {
      return $result;
    }

    if (is_bool($value)) {
      $result["value"] = $value ? "Yes" : "No";
      return $result;
    }

    if (is_scalar($value)) {
      $normalized = trim((string) $value);
      $result["value"] = $normalized === "" ? null : $normalized;
      return $result;
    }

    if (is_array($value)) {
      $links = [];
      $values = collect($value)
        ->map(function ($item) use (&$links) {
          if (is_bool($item)) {
            return $item ? "Yes" : "No";
          }

          if (is_scalar($item)) {
            $normalized = trim((string) $item);
            return $normalized === "" ? null : $normalized;
          }

          if (is_array($item) && !empty($item["url"])) {
            $links[] = [
              "label" => "",
              "url" => (string) $item["url"],
              "name" => $item["name"] ?? null,
            ];
            return "";
          }

          return null;
        })
        ->filter()
        ->values();

      if ($values->isEmpty()) {
        $result["links"] = $links;
        return $result;
      }

      $result["value"] = $values->implode(", ");
      $result["links"] = $links;
      return $result;
    }

    return $result;
  }
}
