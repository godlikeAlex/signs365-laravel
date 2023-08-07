import { useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import AddonItem from "./AddonItem";
import { useFormContext } from "react-hook-form";
import { ProductFormContext } from "@/src/contexts/ProductFormContext";

interface Props {
  loading: boolean;
}

const ProductAddons: React.FC<Props> = ({ loading }: Props) => {
  const { state } = useContext(ProductFormContext);
  const { product, addons } = useAppSelector((state) => state.product);

  if (product.with_checkout === false) return;

  if (loading) {
    return (
      <>
        <Skeleton height={45} />
        <Skeleton height={45} />
      </>
    );
  }

  return (
    <div>
      <h6 className="label-product-show">Addons</h6>

      <div
        style={{ marginTop: 8 }}
        className="ps-product__size ps-select--feature"
      >
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
