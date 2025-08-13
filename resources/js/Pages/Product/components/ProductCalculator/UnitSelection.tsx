import { Button } from "@/src/components";
import React from "react";

import classes from "./ProductCalculator.module.scss";

interface Props {
  currentUnit: "feet" | "inches";
  units: ("feet" | "inches")[];
  disabled: boolean;
  setUnit: (unit: "feet" | "inches") => void;
}

const UnitSelection: React.FC<Props> = ({
  units,
  currentUnit,
  disabled,
  setUnit,
}: Props) => {
  return (
    <div className={classes.unitRow}>
      {units.map((unit) => (
        <Button
          key={unit}
          disabled={disabled}
          onClick={() => setUnit(unit)}
          active={currentUnit === unit}
          variant="ghost"
          color="primary-300"
        >
          {unit}
        </Button>
      ))}
    </div>
  );
};

export default UnitSelection;
