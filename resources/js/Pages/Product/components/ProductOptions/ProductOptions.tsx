import classNames from "classnames";

import { useProductContext } from "@/src/contexts/MainProductContext";
import { IProductCheckout } from "@/src/types/ProductModel";
import { ProductActionKind } from "@/src/reducers/ProductReducer";
import ProductFormSection from "../ProductFormSection";

import classes from "./ProductOptions.module.scss";

interface Props {
  product: IProductCheckout;
}

const ProductOptions = ({ product }: Props) => {
  const { state, dispatch } = useProductContext();

  const { selectedOption, status } = state;
  const disabled = state.status === "fetching";

  if (product.options.length === 1) {
    return (
      <h6>
        Option:{" "}
        <span className="primary-color">{product.options[0].title}</span>
      </h6>
    );
  }

  return (
    <ProductFormSection>
      <ProductFormSection.Title>Option:</ProductFormSection.Title>

      <ul className={classes.productOptions}>
        {product.options.map((option) => (
          <li key={`${product.id}-${option.id}-o`}>
            <button
              className={classNames(classes.productGroupButton, {
                [classes.productGroupButtonActive]:
                  option.id === selectedOption?.id,
              })}
              disabled={disabled}
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
          </li>
        ))}
      </ul>
    </ProductFormSection>
  );
};

export default ProductOptions;
