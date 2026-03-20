import { EstimateFormField } from "@/src/types/EstimateProductModel";
import { TextArea as BaseTextArea } from "@/src/components";
import { EstimateFormSchema } from "../../../../schema/estimate-form-schema";
import { useController, useFormContext } from "react-hook-form";
import { EstimateFieldDisclaimer } from "../EstimateFieldDisclaimer";
import { EstimateFieldError } from "../EstimateFieldError";
import { EstimateTextareaField } from "../../types";

interface Props {
  config: EstimateTextareaField;
}

export default function Textarea({ config }: Props) {
  const { title, disclaimer, dynamicKeyField } = config;

  const { control } = useFormContext<EstimateFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({
    shouldUnregister: true,
    control,
    name: `dynamicEstimateFields.${dynamicKeyField}`,
  });
  const value = typeof field.value === "string" ? field.value : undefined;

  return (
    <>
      <BaseTextArea
        value={value}
        onChange={(e) => field.onChange(e.target.value)}
        placeholder={title}
      />

      {disclaimer ? <EstimateFieldDisclaimer text={disclaimer} /> : null}

      {error ? <EstimateFieldError error={error.message} /> : null}
    </>
  );
}
