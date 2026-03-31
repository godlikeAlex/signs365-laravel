import { IProductEstimate } from "@/src/types/ProductModel";
import { CSSProperties } from "react";
import { useController, useFormContext } from "react-hook-form";
import { EstimateFormSchema } from "../../schema/estimate-form-schema";
import styles from "./SelectForm.module.scss";

interface Props {
  forms: IProductEstimate["estimate_forms"];
}

export default function SelectForm({ forms }: Props) {
  const { control } = useFormContext<EstimateFormSchema>();
  const { field } = useController({
    name: "selectedFormIds",
    control,
    defaultValue: [],
  });

  function handleToggleForm(id: number) {
    if (field.value.includes(id)) {
      if (field.value.length > 1) {
        field.onChange(field.value.filter((selectedID) => selectedID !== id));
      }
    } else {
      field.onChange([...field.value, id]);
    }
  }

  return (
    <div className={styles.selectFormGroup}>
      {forms.map((form) => (
        <button
          key={form.id}
          type="button"
          className={styles.selectFormButton}
          data-active={field.value.includes(form.id)}
          style={
            {
              "--select-form-color": form.color ?? "#FFCA19",
              "--select-form-color-alt": form.alt_color ?? "#FFEDB5",
            } as CSSProperties
          }
          onClick={() => handleToggleForm(form.id)}
        >
          {form.icon && <img src={`/storage/${form.icon}`} />}
          {form.title}
        </button>
      ))}
    </div>
  );
}
