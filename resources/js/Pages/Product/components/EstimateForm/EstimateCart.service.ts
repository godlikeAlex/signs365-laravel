import api from "@/src/api";

export type EstimateFieldValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | File
  | File[]
  | null
  | undefined;

export interface EstimateFieldInput {
  field_id: number;
  option_id?: number | null;
  value?: EstimateFieldValue;
}

export type EstimateFieldsByForm = Record<
  string | number,
  EstimateFieldInput[]
>;

export interface EstimateBundleParams {
  product_id: number;
  selected_form_ids: number[];
  quantity: number;
  unit: "feet" | "inches";
  width: number | string;
  height: number | string;
  fields_by_form: EstimateFieldsByForm;
}

export interface EstimateBundleBreakdownItem {
  estimate_form_id: number;
  price_cents: number;
  price_dollars: string;
}

export interface EstimateBundleCalculateResponse {
  price: string;
  breakdown: EstimateBundleBreakdownItem[];
}

export interface EstimateCartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  line_total: number;
  attributes: Record<string, unknown>;
}

export interface EstimateCartResponse {
  items: EstimateCartItem[];
  subtotal: number;
  total: number;
  amount_in_cents: number;
}

export interface EstimateUpdateQuantityParams {
  item_id: string;
  type: "add" | "reduce";
}

export interface EstimateRemoveItemParams {
  item_id: string;
}

export interface SubmitEstimateRequestParams {
  name: string;
  email: string;
  phone: string;
  address: string;
}

function appendNestedFormData(
  formData: FormData,
  key: string,
  value: unknown
): void {
  if (value === undefined || value === null) {
    return;
  }

  if (value instanceof File) {
    formData.append(key, value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((arrayItem, index) => {
      appendNestedFormData(formData, `${key}[${index}]`, arrayItem);
    });
    return;
  }

  if (typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(
      ([nestedKey, nestedValue]) => {
        appendNestedFormData(formData, `${key}[${nestedKey}]`, nestedValue);
      }
    );
    return;
  }

  formData.append(key, String(value));
}

function buildBundleFormData(params: EstimateBundleParams): FormData {
  const formData = new FormData();

  formData.append("product_id", String(params.product_id));
  formData.append("quantity", String(params.quantity));
  formData.append("unit", params.unit);
  formData.append("width", String(params.width));
  formData.append("height", String(params.height));

  params.selected_form_ids.forEach((formID) => {
    formData.append("selected_form_ids[]", String(formID));
  });

  Object.entries(params.fields_by_form).forEach(([formID, fields]) => {
    fields.forEach((field, index) => {
      formData.append(
        `fields_by_form[${formID}][${index}][field_id]`,
        String(field.field_id)
      );

      if (field.option_id !== undefined && field.option_id !== null) {
        formData.append(
          `fields_by_form[${formID}][${index}][option_id]`,
          String(field.option_id)
        );
      }

      appendNestedFormData(
        formData,
        `fields_by_form[${formID}][${index}][value]`,
        field.value
      );
    });
  });

  return formData;
}

export default class EstimateCartService {
  static getCart() {
    return api.get<EstimateCartResponse>("/estimate/cart");
  }

  static calculateBundle(params: EstimateBundleParams, signal?: AbortSignal) {
    return api.post<EstimateBundleCalculateResponse>(
      "/estimate/cart/calculate-bundle",
      buildBundleFormData(params),
      {
        headers: { "Content-Type": "multipart/form-data" },
        signal,
      }
    );
  }

  static addBundle(params: EstimateBundleParams) {
    return api.post<EstimateCartResponse>(
      "/estimate/cart/add-bundle",
      buildBundleFormData(params),
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  static updateQuantity(body: EstimateUpdateQuantityParams) {
    return api.post<EstimateCartResponse>(
      "/estimate/cart/update-quantity",
      body
    );
  }

  static removeItem(body: EstimateRemoveItemParams) {
    return api.post<EstimateCartResponse>("/estimate/cart/remove-item", body);
  }

  static clear() {
    return api.post<{ ok: true }>("/estimate/cart/clear");
  }

  static submit(body: SubmitEstimateRequestParams) {
    return api.post<{ ok: true }>("/estimate/cart/submit", body);
  }
}
