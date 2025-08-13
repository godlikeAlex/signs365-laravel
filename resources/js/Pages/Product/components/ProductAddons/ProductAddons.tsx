import React from "react";
import AddonItem from "./AddonItem";
import { useProductContext } from "@/src/contexts/MainProductContext";
import { IProductCheckout } from "@/src/types/ProductModel";
import { groupAddons } from "@/src/helper";
import ProductFormSection from "../ProductFormSection";

import classes from "./ProductAddons.module.scss";
import classNames from "classnames";

interface Props {
  product: IProductCheckout;
}

const ProductAddons: React.FC<Props> = ({ product }: Props) => {
  const { state, dispatch } = useProductContext();
  const disabled = state.status === "fetching";

  const groupedAddons = groupAddons(state.selectedOption.addons);

  return (
    <>
      {Object.keys(groupedAddons).map((groupName) => (
        <ProductFormSection key={groupName}>
          <ProductFormSection.Title>{groupName}</ProductFormSection.Title>

          <div
            className={classNames(classes.addonsList, {
              [classes.addonsListTwoColumns]: !groupedAddons[groupName].some(
                (addon) => addon.extra_data_type !== "unset"
              ),
            })}
          >
            {groupedAddons[groupName].map((addon) => (
              <AddonItem
                disabled={disabled}
                key={`${product.id}-${addon.id}-a`}
                addon={addon}
              />
            ))}
          </div>
        </ProductFormSection>
      ))}
    </>
  );
};

export default ProductAddons;
