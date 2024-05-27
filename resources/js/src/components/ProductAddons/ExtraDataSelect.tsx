import React from "react";
import { grommetsData, polePocketData } from "./extraDataInputs";
import { ExtraDataType } from "@/src/types/ProductModel";
import {
  ProductActionKind,
  SelectedAddon,
} from "@/src/reducers/ProductReducer";
import { useProductContext } from "@/src/contexts/MainProductContext";

interface Props {
  type: ExtraDataType;
  addon: SelectedAddon;
}

const ExtraDataSelect: React.FC<Props> = ({ type, addon }: Props) => {
  const { dispatch } = useProductContext();

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
    dispatch({
      type: ProductActionKind.SELECT_EXTRA_ITEM_IN_ADDON,
      payload: {
        addonID: addon.id,
        targetExtraData: extraData,
        isMultiSelect,
      },
    });
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
