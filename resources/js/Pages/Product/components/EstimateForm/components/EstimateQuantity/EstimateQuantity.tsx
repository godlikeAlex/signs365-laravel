import { BaseInput } from "@/src/components";
import { useController, useFormContext } from "react-hook-form";
import { EstimateFormSchema } from "../../schema/estimate-form-schema";

export default function EstimateQuantity() {
  const { control } = useFormContext<EstimateFormSchema>();
  const {
    field,
    formState: { isSubmitting },
  } = useController({
    control,
    name: "quantity",
  });

  const value =
    typeof field.value === "number" && Number.isFinite(field.value)
      ? field.value
      : 1;

  const handleChange = (nextQuantity: number) => {
    if (!Number.isFinite(nextQuantity)) {
      return;
    }

    field.onChange(nextQuantity < 1 ? 1 : nextQuantity);
  };

  return (
    <div className="qty-input-with-btns">
      <button
        type="button"
        onClick={() => handleChange(value - 1)}
        disabled={isSubmitting}
      >
        <i className="icon-minus" />
      </button>

      <BaseInput
        type="text"
        value={String(value)}
        onChange={(e) => {
          const normalized = e.target.value.replace(/\D/g, "");

          if (normalized === "") {
            field.onChange(1);
            return;
          }

          handleChange(Number(normalized));
        }}
        onBlur={() => handleChange(value)}
        disabled={isSubmitting}
        style={{ textAlign: "center" }}
      />

      <button
        type="button"
        onClick={() => handleChange(value + 1)}
        disabled={isSubmitting}
      >
        <i className="icon-plus" />
      </button>
    </div>
  );
}
