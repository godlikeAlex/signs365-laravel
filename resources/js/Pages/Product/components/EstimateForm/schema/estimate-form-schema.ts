import { ProductEstimateForm } from "@/src/types/EstimateProductModel";
import { z } from "zod";
import EstimateFormService from "../EstimateForm.service";

const fileValueSchema = z
  .instanceof(File)
  .or(z.array(z.instanceof(File)))
  .or(z.null())
  .optional();

const dynamicValueSchema = z.union([
  z.string(),
  z.number(),
  z.array(z.number()),
  z.array(z.string()),
  fileValueSchema,
]);

export const estimateFormSchema = z.object({
  selectedFormIds: z.array(z.number()),
  quantity: z.number().min(1),
  width: z.number(),
  height: z.number(),
  unit: z.union([z.literal("inches"), z.literal("feet")]),
  dynamicEstimateFields: z.record(dynamicValueSchema).default({}),
});

export function createEstimateFormSchema(forms: ProductEstimateForm[]) {
  return estimateFormSchema.superRefine((data, ctx) => {
    const fields = EstimateFormService.combineFormFields({
      forms,
      selectedFormIds: data.selectedFormIds,
    });

    for (const field of fields) {
      const key = `${field.form_id}-${field.id}`;
      const value = data.dynamicEstimateFields?.[key];

      if (
        field.field_type === "radio" &&
        data.dynamicEstimateFields[field.id]
      ) {
        const selectedOption = field.options.find(
          (option) => option.id === data.dynamicEstimateFields[field.id]
        );

        selectedOption.extra_inputs.forEach((extraInput) => {
          if (!extraInput.required) return;

          if (!data.dynamicEstimateFields?.[extraInput.id]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [
                "dynamicEstimateFields",
                `${field.form_id}-${extraInput.id}`,
              ],
              message: "This field is required.",
            });
          }
        });
      }

      if (!field.is_required) continue;

      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["dynamicEstimateFields", key],
          message: "This field is required.",
        });
      }
    }
  });
}

export type EstimateFormSchema = z.infer<typeof estimateFormSchema>;
