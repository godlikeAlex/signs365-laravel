import React from "react";
import AddonItem from "./AddonItem";
import { useProductContext } from "@/src/contexts/MainProductContext";
import { IProductCheckout } from "@/src/types/ProductModel";

interface Props {
  product: IProductCheckout;
}

const ProductAddons: React.FC<Props> = ({ product }: Props) => {
  const { state, dispatch } = useProductContext();
  const disabled = state.status === "fetching";

  return (
    <div>
      <h6 className="label-product-show">Addons</h6>

      <div
        style={{ marginTop: 8 }}
        className="ps-product__size ps-select--feature"
      >
        {state.selectedOption?.addons.map((addon) => (
          <AddonItem
            disabled={disabled}
            key={`${product.id}-${addon.id}-a`}
            addon={addon}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductAddons;
