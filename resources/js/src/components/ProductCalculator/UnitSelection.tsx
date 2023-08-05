import classNames from "classnames";
import React from "react";

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
    <div className="row">
      {units.map((unit) => (
        <div
          className={classNames("product-variant", {
            "active-variant": currentUnit === unit,
            "disabled-variant": disabled,
          })}
          key={unit}
          onClick={() => !disabled && setUnit(unit)}
        >
          <h6 style={{ textTransform: "capitalize" }}>{unit}</h6>
        </div>
      ))}
    </div>
  );
};

export default UnitSelection;
