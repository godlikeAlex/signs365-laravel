import React from "react";
import AddonItem from "./AddonItem";
import { useProductContext } from "@/src/contexts/MainProductContext";
import { IProductCheckout } from "@/src/types/ProductModel";
import { groupAddons } from "@/src/helper";

interface Props {
  product: IProductCheckout;
}

const ProductAddons: React.FC<Props> = ({ product }: Props) => {
  const { state, dispatch } = useProductContext();
  const disabled = state.status === "fetching";

  const groupedAddons = groupAddons(state.selectedOption.addons);

  return (
    <div>
      {Object.keys(groupedAddons).map((groupName) => (
        <div style={{ marginTop: 12 }}>
          <h6 className="label-product-show">{groupName}</h6>

          <div
            style={{ marginTop: 8 }}
            className="ps-product__size ps-select--feature"
          >
            {groupedAddons[groupName].map((addon) => (
              <AddonItem
                disabled={disabled}
                key={`${product.id}-${addon.id}-a`}
                addon={addon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAddons;
