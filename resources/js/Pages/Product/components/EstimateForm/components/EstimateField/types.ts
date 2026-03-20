import { FieldOption } from "@/src/types/EstimateProductModel";

type BasicEstimateField = {
  dynamicKeyField: string;
  title: string;
  disclaimer?: string;
  form_id: number;
};

export type EstimateInputField = BasicEstimateField & {
  field_type: "text";
};

export type EstimateTextareaField = BasicEstimateField & {
  field_type: "textarea";
};

export type EstimateFileField = BasicEstimateField & {
  field_type: "file";
};

export type EstimateRadioSelectField = BasicEstimateField & {
  field_type: "radio";
  options: FieldOption[];
};

export type DynamicEstimateField =
  | EstimateInputField
  | EstimateTextareaField
  | EstimateRadioSelectField
  | EstimateFileField;
