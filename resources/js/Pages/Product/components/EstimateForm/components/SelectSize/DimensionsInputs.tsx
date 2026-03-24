import { BaseInput } from "@/src/components";
import { FocusEvent } from "react";
import { useFormContext } from "react-hook-form";
import { EstimateFormSchema } from "../../schema/estimate-form-schema";

export default function DimensionsInputs() {
  const { register, setValue } = useFormContext<EstimateFormSchema>();
  const widthField = register("width", { valueAsNumber: true });
  const heightField = register("height", { valueAsNumber: true });

  const handleNormalizeOnBlur =
    (fieldName: "width" | "height") =>
    (event: FocusEvent<HTMLInputElement>) => {
      const rawValue = event.target.value?.trim() ?? "";
      const parsedValue = Number(rawValue);

      if (!rawValue || Number.isNaN(parsedValue) || parsedValue <= 0) {
        setValue(fieldName, 1, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    };

  return (
    <>
      <BaseInput
        {...widthField}
        type="text"
        label="Width"
        inputMode="decimal"
        onBlur={(event) => {
          widthField.onBlur(event);
          handleNormalizeOnBlur("width")(event);
        }}
      />
      <BaseInput
        {...heightField}
        type="text"
        label="Height"
        inputMode="decimal"
        onBlur={(event) => {
          heightField.onBlur(event);
          handleNormalizeOnBlur("height")(event);
        }}
      />
    </>
  );
}
