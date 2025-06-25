import React from "react";
import classNames from "classnames";
import { useProductContext } from "@/src/contexts/MainProductContext";
import { IProductCheckout } from "@/src/types/ProductModel";
import { ProductActionKind } from "@/src/reducers/ProductReducer";

interface Props {
  product: IProductCheckout;
}

const ProductOptions = ({ product }: Props) => {
  const { state, dispatch } = useProductContext();

  const { selectedOption, status } = state;
  const disabled = state.status === "fetching";

  if (product.options.length === 1) {
    return <h6>Option: {product.options[0].title}</h6>;
  }

  return (
    <div>
      <h6>Options:</h6>

      <div
        className="ps-product__size ps-select--feature"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {product.options.map((option) => (
          <button
            className={classNames(
              {
                active: option.id === selectedOption?.id,
                "disabled-variant": disabled,
              },
              "rounded-button"
            )}
            disabled={disabled}
            style={{ marginRight: 10, marginTop: 10 }}
            key={`${product.id}-${option.id}-o`}
            onClick={(e) => {
              e.preventDefault();

              dispatch({
                type: ProductActionKind.SELECT_OPTION,
                payload: option,
              });
            }}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductOptions;
