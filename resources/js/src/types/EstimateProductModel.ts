interface ExtraInput {
  id: string;
  label: string;
  required: string;
  type: string;
}

export interface FieldOption {
  id: number;
  title: string;
  condition: string;
  min_price: number;
  disclaimer?: string;
  extra_inputs: ExtraInput[];
  is_active: boolean;
  type: string;
}

export type EstimateFormFieldType = "radio" | "textarea" | "text" | "file";

export interface EstimateFormField {
  id: number;
  title: string;
  field_type: EstimateFormFieldType;
  disclaimer?: string;
  cart_label?: string;
  is_active: boolean;
  is_required: boolean;
  options: FieldOption[];
  form_id: number;
}

export interface ProductEstimateForm {
  id: number;
  title: string;
  type: string;
  fields: EstimateFormField[];
  min_price: number;
  price: number;
  icon?: string;
  color?: string;
}
