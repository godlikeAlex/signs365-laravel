import { BaseInput } from "@/src/components";
import { Controller, useFormContext } from "react-hook-form";
import { EstimateFormSchema } from "../../schema/estimate-form-schema";

export default function DimensionsInputs() {
  const { register } = useFormContext<EstimateFormSchema>();

  return (
    <>
      <BaseInput
        {...register("width", { valueAsNumber: true })}
        type="text"
        label="Width"
      />
      <BaseInput
        {...register("height", { valueAsNumber: true })}
        type="text"
        label="Height"
      />
    </>
  );
}
