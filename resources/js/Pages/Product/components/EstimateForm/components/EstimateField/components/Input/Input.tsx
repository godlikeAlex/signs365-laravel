import { EstimateFormField } from "@/src/types/EstimateProductModel";
import { BaseInput } from "@/src/components";
import { EstimateFormSchema } from "../../../../schema/estimate-form-schema";
import { useController, useFormContext } from "react-hook-form";
import { EstimateFieldDisclaimer } from "../EstimateFieldDisclaimer";
import { EstimateFieldError } from "../EstimateFieldError";
import { EstimateInputField } from "../../types";

interface Props {
  config: EstimateInputField;
}

export default function Input({ config }: Props) {
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
      <BaseInput
        value={value}
        onChange={(e) => field.onChange(e.target.value)}
        placeholder={title}
      />

      {disclaimer ? <EstimateFieldDisclaimer text={disclaimer} /> : null}

      {error ? <EstimateFieldError error={error.message} /> : null}
    </>
  );
}
