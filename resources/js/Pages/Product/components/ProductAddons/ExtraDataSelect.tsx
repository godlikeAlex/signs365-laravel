import React, { useEffect } from "react";
import { grommetsData, polePocketData } from "./extraDataInputs";
import { Addon, ExtraDataType } from "@/src/types/ProductModel";
import {
  ProductActionKind,
  SelectedAddon,
} from "@/src/reducers/ProductReducer";
import { useProductContext } from "@/src/contexts/MainProductContext";
import classes from "./ProductAddons.module.scss";
import classNames from "classnames";

interface Props {
  type: ExtraDataType;
  addon: Addon;
  // addon: SelectedAddon;
}

const ExtraDataSelect: React.FC<Props> = ({ type, addon }: Props) => {
  const { dispatch, state } = useProductContext();
  const { selectedAddons } = state;

  const selectedAddon = selectedAddons.find((a) => addon.id === a.id);

  useEffect(() => {
    if (selectedAddon && selectedAddon.extra_data_selected.length === 0) {
      return dispatch({
        type: ProductActionKind.REMOVE_ADDON,
        payload: { id: addon.id },
      });
    }
  }, [selectedAddon]);

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
    if (!selectedAddon) {
      dispatch({ type: ProductActionKind.SELECT_ADDON, payload: { addon } });
    }

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
    <div className={classes.extraCheckboxList}>
      {data.map((extraData) => (
        <button
          className={classNames(classes.extraCheckbox, {
            [classes.extraCheckboxActive]:
              selectedAddon?.extra_data_selected.find(
                (selectedData) => selectedData.id === extraData.id
              ),
          })}
          key={extraData.id}
          onClick={() => handleChange(extraData)}
        >
          {/* <input
            type="checkbox"
            // onChange={() => handleChange(extraData)}
            // checked={
              // addon.extra_data_selected.find(
              //   (selectedData) => selectedData.id === extraData.id
              // )
            //     ? true
            //     : false
            // }
          /> */}
          <span>{extraData.title}</span>
        </button>
      ))}
    </div>
  );
};

export default ExtraDataSelect;
