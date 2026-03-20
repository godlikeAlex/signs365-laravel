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
    dynamicEstimateFields: Record<string, EstimateFieldValue>
  ): EstimateFieldsByForm {
    const fieldsByForm: EstimateFieldsByForm = {};

    Object.entries(dynamicEstimateFields ?? {}).forEach(([key, value]) => {
      const keyMatch = key.match(/^(\d+)-(\d+)$/);
      if (!keyMatch) return;

      const formID = keyMatch[1];
      const fieldID = Number(keyMatch[2]);
      if (!fieldsByForm[formID]) {
        fieldsByForm[formID] = [];
      }

      if (Array.isArray(value)) {
        if (value.length === 0) return;

        const allNumbers = value.every((item) => typeof item === "number");
        if (allNumbers) {
          value.forEach((optionID) => {
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
          value,
        });
        return;
      }

      if (typeof value === "number") {
        fieldsByForm[formID].push({
          field_id: fieldID,
          option_id: value,
          value,
        });
        return;
      }

      if (value !== undefined && value !== null && value !== "") {
        fieldsByForm[formID].push({
          field_id: fieldID,
          value,
        });
      }
    });

    return fieldsByForm;
  }

  static buildBundleParams(
    productID: number,
    data: EstimateFormSchema
  ): EstimateBundleParams {
    return {
      product_id: productID,
      selected_form_ids: data.selectedFormIds,
      quantity: data.quantity,
      unit: data.unit,
      width: data.width,
      height: data.height,
      fields_by_form: this.buildFieldsByForm(data.dynamicEstimateFields),
    };
  }
}
