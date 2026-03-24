import {
  EstimateFormField,
  ProductEstimateForm,
} from "@/src/types/EstimateProductModel";
import {
  EstimateBundleParams,
  EstimateFieldValue,
  EstimateFieldsByForm,
} from "./EstimateCart.service";
import type { EstimateFormSchema } from "./schema/estimate-form-schema";

type EstimateFormFieldWithFormID = EstimateFormField & {
  form_id: number;
};

export default class EstimateFormService {
  private static normalizeMinOne(value: unknown): number {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < 1) {
      return 1;
    }

    return parsed;
  }

  private static buildExtraInputSources(params: {
    forms: ProductEstimateForm[];
    selectedFormIds: number[];
    dynamicEstimateFields: Record<string, EstimateFieldValue>;
  }): Map<string, { formID: string; fieldID: number; optionID: number }> {
    const { forms, selectedFormIds, dynamicEstimateFields } = params;
    const map = new Map<
      string,
      { formID: string; fieldID: number; optionID: number }
    >();

    forms
      .filter((form) => selectedFormIds.includes(form.id))
      .forEach((form) => {
        form.fields.forEach((field) => {
          if (field.field_type !== "radio") {
            return;
          }

          const parentKey = `${form.id}-${field.id}`;
          const selectedOptionID = dynamicEstimateFields[parentKey];
          if (typeof selectedOptionID !== "number") {
            return;
          }

          const selectedOption = field.options.find(
            (option) => option.id === selectedOptionID
          );
          if (!selectedOption) {
            return;
          }

          selectedOption.extra_inputs?.forEach((extraInput) => {
            map.set(`${form.id}-${extraInput.id}`, {
              formID: String(form.id),
              fieldID: field.id,
              optionID: selectedOption.id,
            });
          });
        });
      });

    return map;
  }

  static combineFormFields({
    selectedFormIds,
    forms,
  }: {
    selectedFormIds: number[];
    forms: ProductEstimateForm[];
  }): EstimateFormFieldWithFormID[] {
    const fieldsMap = new Map();
    const formFields = [...selectedFormIds]
      .sort((a, b) => a - b)
      .flatMap((selectedFormID) => {
        const selectedForm = forms.find((form) => form.id === selectedFormID);
        if (!selectedForm) return [];

        return selectedForm.fields.map((field) => ({
          ...field,
          form_id: selectedForm.id,
        }));
      });

    for (const field of formFields) {
      const trimmedKey = field.title.trim().toLowerCase();

      if (!fieldsMap.has(trimmedKey)) {
        fieldsMap.set(trimmedKey, field);
      }
    }

    return Array.from(fieldsMap.values());
  }

  static buildFieldsByForm(
    dynamicEstimateFields: Record<string, EstimateFieldValue>,
    options?: {
      forms?: ProductEstimateForm[];
      selectedFormIds?: number[];
    }
  ): EstimateFieldsByForm {
    const fieldsByForm: EstimateFieldsByForm = {};
    const extraInputSources =
      options?.forms && options?.selectedFormIds
        ? this.buildExtraInputSources({
            forms: options.forms,
            selectedFormIds: options.selectedFormIds,
            dynamicEstimateFields,
          })
        : new Map<
            string,
            { formID: string; fieldID: number; optionID: number }
          >();

    Object.entries(dynamicEstimateFields ?? {}).forEach(([key, value]) => {
      const keyMatch = key.match(/^(\d+)-(\d+)$/);
      const extraInputSource = !keyMatch ? extraInputSources.get(key) : null;
      if (!keyMatch && !extraInputSource) return;

      const formID = keyMatch ? keyMatch[1] : extraInputSource!.formID;
      const fieldID = keyMatch
        ? Number(keyMatch[2])
        : extraInputSource!.fieldID;
      if (!fieldsByForm[formID]) {
        fieldsByForm[formID] = [];
      }

      if (Array.isArray(value)) {
        if (value.length === 0) return;
        const arrayValue = value as Array<unknown>;

        const allNumbers = arrayValue.every((item) => typeof item === "number");
        if (allNumbers) {
          arrayValue.forEach((optionID) => {
            fieldsByForm[formID].push({
              field_id: fieldID,
              option_id: Number(optionID),
              value: Number(optionID),
            });
          });
          return;
        }

        fieldsByForm[formID].push({
          field_id: fieldID,
          ...(extraInputSource ? { option_id: extraInputSource.optionID } : {}),
          value: arrayValue as EstimateFieldValue,
        });
        return;
      }

      if (typeof value === "number") {
        fieldsByForm[formID].push({
          field_id: fieldID,
          option_id: extraInputSource ? extraInputSource.optionID : value,
          value,
        });
        return;
      }

      if (value !== undefined && value !== null && value !== "") {
        fieldsByForm[formID].push({
          field_id: fieldID,
          ...(extraInputSource ? { option_id: extraInputSource.optionID } : {}),
          value,
        });
      }
    });

    return fieldsByForm;
  }

  static buildBundleParams(
    productID: number,
    data: EstimateFormSchema,
    forms?: ProductEstimateForm[]
  ): EstimateBundleParams {
    const normalizedQuantity = this.normalizeMinOne(data.quantity);
    const normalizedWidth = this.normalizeMinOne(data.width);
    const normalizedHeight = this.normalizeMinOne(data.height);

    return {
      product_id: productID,
      selected_form_ids: data.selectedFormIds,
      quantity: normalizedQuantity,
      unit: data.unit,
      width: normalizedWidth,
      height: normalizedHeight,
      fields_by_form: this.buildFieldsByForm(data.dynamicEstimateFields, {
        forms,
        selectedFormIds: data.selectedFormIds,
      }),
    };
  }
}
