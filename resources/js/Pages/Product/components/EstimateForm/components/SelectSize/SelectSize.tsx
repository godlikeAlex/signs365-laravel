import { Controller, useFormContext } from "react-hook-form";
import { EstimateFormSchema } from "../../schema/estimate-form-schema";
import { ToggleButton } from "../ToggleButton";
import DimensionsInputs from "./DimensionsInputs";

import styles from "./SelectSize.module.scss";

const UNITS = ["inches", "feet"];

export default function SelectSize() {
  const { control, watch } = useFormContext<EstimateFormSchema>();

  return (
    <>
      <div className={styles.unitGroup}>
        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <>
              {UNITS.map((unit) => (
                <ToggleButton
                  key={unit}
                  isActive={field.value === unit}
                  style={{
                    textTransform: "capitalize",
                  }}
                  onClick={() => field.onChange(unit)}
                >
                  {unit}
                </ToggleButton>
              ))}
            </>
          )}
        />
      </div>

      <div className={styles.dimensionsGroup}>
        <DimensionsInputs />
      </div>
    </>
  );
}
