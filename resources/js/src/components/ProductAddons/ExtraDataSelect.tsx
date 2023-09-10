import React from "react";
import { grommetsData, polePocketData } from "./extraDataInputs";
import { ExtraDataType } from "@/src/types/ProductModel";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import {
  AddonWithExtraFields,
  selectExtraDataItems,
} from "@/src/redux/singleProductSlice";

interface Props {
  type: ExtraDataType;
  addon: AddonWithExtraFields;
}

const ExtraDataSelect: React.FC<Props> = ({ type, addon }: Props) => {
  const dispatch = useAppDispatch();

  const [data, isMultiSelect] = React.useMemo(() => {
    switch (type) {
      case "grommets":
        return [grommetsData.data, grommetsData.multiSelect];
      case "pole_pocket":
        return [polePocketData.data, polePocketData.multiSelect];
      default:
        return [[], false];
    }
  }, [type]);

  if (type === "unset") return null;

  const handleChange = (extraData: { id: number; title: string }) => {
    dispatch(
      selectExtraDataItems({
        targetExtraData: extraData,
        addonID: addon.id,
        isMultiSelect,
      })
    );
  };

  return (
    <div className="extra-data-container">
      {data.map((extraData) => (
        <label className="extra-data-item" key={extraData.id}>
          <input
            type="checkbox"
            onChange={() => handleChange(extraData)}
            checked={
              addon.extra_data_selected.find(
                (selectedData) => selectedData.id === extraData.id
              )
                ? true
                : false
            }
          />
          <span style={{ marginLeft: 5 }}>{extraData.title}</span>
        </label>
      ))}
    </div>
  );
};

export default ExtraDataSelect;
