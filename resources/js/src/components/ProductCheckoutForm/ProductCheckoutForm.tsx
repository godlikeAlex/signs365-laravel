import { useProductContext } from "@/src/contexts/MainProductContext";
import React, { useEffect } from "react";
import LoadingProductCheckoutForm from "./LoadingProductCheckoutForm";
import Skeleton from "react-loading-skeleton";
import ProductOptions from "../ProductOptions";
import { IProductCheckout } from "@/src/types/ProductModel";
import { useDebounceEffect } from "ahooks";
import { ProductActionKind } from "@/src/reducers/ProductReducer";
import { CartService } from "@/src/services";
import ProductAddons from "../ProductAddons/ProductAddons";
import ProductQuantity from "../ProductQuantity";

interface ProductCheckoutFormProps {}

function ProductCheckoutForm({}: ProductCheckoutFormProps) {
  const { state, dispatch } = useProductContext();
  const product = state.product as IProductCheckout;

  const [priceInitialized, setPriceInitialized] = React.useState(true);

  console.log(state.quantity);

  const calculatePrice = React.useCallback(async () => {
    const isValidSizes = Object.values({
      width: state.width > 0,
      height: state.height > 0,
    }).every((key) => key);

    if (!isValidSizes || !product) {
      return;
    }

    dispatch({ type: ProductActionKind.START_FETCHING });

    const { data } = await CartService.calculatePrice({
      productID: product.id,
      option_id: state.selectedOption?.id,
      addons: state.selectedAddons,
      unit: state.unit,
      width: state.width,
      height: state.height,
      quantity: state.quantity,
      size_id: 1,
    });

    dispatch({ type: ProductActionKind.UPDATE_PRICE, payload: data.price });
  }, [
    state.product,
    state.selectedOption,
    state.selectedAddons,
    state.width,
    state.height,
    state.quantity,
    state.unit,
  ]);

  console.log(state);

  useEffect(() => {
    calculatePrice().then(() => {
      setPriceInitialized(true);
    });
  }, [calculatePrice]);

  useDebounceEffect(() => {
    if (!priceInitialized) {
      calculatePrice();
    }
  }, [calculatePrice]);

  if (!state.calculatedPrice) {
    return <LoadingProductCheckoutForm />;
  }

  return (
    <>
      <div
        className="ps-product__meta"
        style={{
          marginTop: 0,
          borderBottom: "1px solid #f0f2f5",
        }}
      >
        <div>
          <ProductOptions product={product} />
        </div>

        {state.selectedOption && state.selectedOption.addons.length > 0 ? (
          <div style={{ marginTop: 20 }}>
            <ProductAddons product={product} />
          </div>
        ) : null}

        {/* {state.selectedOption?.showCalculator ? (
            <div style={{ marginTop: 20 }}>
              <ProductCalculator
                {...{
                  state,
                  setState,
                  validationRules,
                }}
              />
            </div>
          ) : null} */}
      </div>

      <div>
        <h6 className="label-product-show">Quantity:</h6>

        <ProductQuantity
          value={state.quantity}
          onChange={(quantity) =>
            dispatch({
              type: ProductActionKind.UPDATE_QUANTITY_OF_PRODUCT,
              payload: { quantity },
            })
          }
        />

        <span className="ps-product__price">{state.calculatedPrice} $</span>

        {/* <button
            type="submit"
            className="ps-btn ps-btn--warning"
            onClick={() =>
              selectedOption.need_file
                ? dragAndDropRef.current.showModal()
                : submitAddToCart()
            }
            style={{ marginTop: 20 }}
            disabled={state.disabled}
          >
            Add to cart
          </button> */}
      </div>
    </>
  );
}

export default ProductCheckoutForm;
