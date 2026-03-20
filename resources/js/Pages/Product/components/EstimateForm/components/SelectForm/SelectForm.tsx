import { IProductEstimate } from "@/src/types/ProductModel";
import { Controller, useController, useFormContext } from "react-hook-form";
import { EstimateFormSchema } from "../../schema/estimate-form-schema";
import { ToggleButton } from "../ToggleButton";
import styles from "./SelectForm.module.scss";

interface Props {
  forms: IProductEstimate["estimate_forms"];
}

export default function SelectForm({ forms }: Props) {
  const { control } = useFormContext<EstimateFormSchema>();
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
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
        <ToggleButton
          key={form.id}
          isActive={field.value.includes(form.id)}
          onClick={() => handleToggleForm(form.id)}
        >
          {form.title}
        </ToggleButton>
      ))}
    </div>
  );
}
