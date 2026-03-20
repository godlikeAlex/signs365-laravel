import { EstimateFormField } from "@/src/types/EstimateProductModel";
import { useController, useFormContext } from "react-hook-form";
import { EstimateFormSchema } from "../../../../schema/estimate-form-schema";
import { ToggleButton } from "../../../ToggleButton";
import { EstimateRadioSelectField } from "../../types";
import { EstimateFieldDisclaimer } from "../EstimateFieldDisclaimer";
import { EstimateFieldError } from "../EstimateFieldError";
import { Upload, UploadControl } from "../Upload";

import styles from "./RadioToggle.module.scss";

interface Props {
  config: EstimateRadioSelectField;
}

export default function RadioSelect({ config }: Props) {
  const { form_id, options, disclaimer, dynamicKeyField } = config;

  const { control } = useFormContext<EstimateFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({
    shouldUnregister: true,
    control,
    name: `dynamicEstimateFields.${dynamicKeyField}`,
  });
  const value = typeof field.value === "number" ? field.value : undefined;
  const currentSelectedOption = options.find((option) => option.id === value);
  const disclaimerText = currentSelectedOption?.disclaimer || disclaimer;

  return (
    <>
      <div className={styles.group}>
        {options.map((option) => (
          <ToggleButton
            key={option.id}
            onClick={() => field.onChange(option.id)}
            isActive={value === option.id}
          >
            {option.title}
          </ToggleButton>
        ))}
      </div>

      {disclaimerText ? (
        <EstimateFieldDisclaimer text={disclaimerText} />
      ) : null}

      {error ? <EstimateFieldError error={error.message} /> : null}

      {currentSelectedOption?.extra_inputs.map((extraInput) => (
        <div className="mt-2" key={extraInput.id}>
          <UploadControl name={`${form_id}-${extraInput.id}`} />
        </div>
      ))}
    </>
  );
}
