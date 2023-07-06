import { useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import AddonItem from "./AddonItem";
import { useFormContext } from "react-hook-form";
import { ProductFormContext } from "@/src/contexts/ProductFormContext";

interface Props {}

const ProductAddons: React.FC<Props> = ({}: Props) => {
  const { state } = useContext(ProductFormContext);
  const { product, addons } = useAppSelector((state) => state.product);

  if (product.with_checkout === false) return;

  return (
    <div className="row">
      <div className="col-md-12">
        <h6 className="label-product-show">Addons:</h6>
      </div>

      <div className="col-md-12" style={{ marginTop: 8 }}>
        {addons.map((addon) => (
          <AddonItem
            disabled={state.disabled}
            key={`${product.id}-${addon.id}-a`}
            addon={addon}
            error={
              state.selectedAddons.find(
                (selectedAddon) => selectedAddon.id === addon.id
              )?.error
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProductAddons;
