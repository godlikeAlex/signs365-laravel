import { useProductContext } from "@/src/contexts/MainProductContext";
import React, { useEffect } from "react";
import LoadingProductCheckoutForm from "./LoadingProductCheckoutForm";
import Skeleton from "react-loading-skeleton";
import ProductOptions from "@/Pages/Product/components/ProductOptions";
import { IProductCheckout } from "@/src/types/ProductModel";
import { useDebounceEffect } from "ahooks";
import { ProductActionKind } from "@/src/reducers/ProductReducer";
import { CartService } from "@/src/services";
import ProductAddons from "@/Pages/Product/components/ProductAddons/ProductAddons";
import ProductQuantity from "@/Pages/Product/components/ProductQuantity";
import ProductCalculator from "@/Pages/Product/components/ProductCalculator";
import SelectProductFile from "@/src/components/SelectProductFile";
import { SelectProductFileRef } from "@/src/components/SelectProductFile/SelectProductFile";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";
import { FileState } from "@/src/components/Dropzone/Dropzone";
import ProductQuantityList from "@/Pages/Product/components/ProductQuantityList";
import ProductFormSection from "../ProductFormSection";

import classes from "./ProductCheckoutForm.module.scss";
import { Button } from "@/src/components";

interface ProductCheckoutFormProps {}

function ProductCheckoutForm({}: ProductCheckoutFormProps) {
  const dragAndDropRef = React.useRef<SelectProductFileRef>(null);
  const { state, dispatch } = useProductContext();
  const product = state.product as IProductCheckout;

  const [priceInitialized, setPriceInitialized] = React.useState(false);

  const calculatePrice = React.useCallback(async () => {
    const isValidSizes = Object.values({
      width: state.width.value > 0,
      height: state.height.value > 0,
    }).every((key) => key);

    const quantity = state.quantity.value ? state.quantity.value : 0;

    if (!isValidSizes || !product || quantity <= 0) {
      return;
    }

    if (!state.width.initiated || !state.height.initiated) {
      return;
    }

    if (state.width.error || state.height.error) {
      return;
    }

    dispatch({ type: ProductActionKind.START_FETCHING });

    const { data } = await CartService.calculatePrice({
      productID: product.id,
      option_id: state.selectedOption?.id,
      addons: state.selectedAddons,
      unit: state.unit,
      width: state.width.value,
      height: state.height.value,
      quantity: state.quantity.value || 1,
      size_id: 1,
    });

    dispatch({ type: ProductActionKind.UPDATE_PRICE, payload: data.price });
  }, [
    product,
    state.selectedOption,
    state.selectedAddons,
    state.width,
    state.height,
    state.quantity,
    state.unit,
  ]);

  useDebounceEffect(() => {
    calculatePrice().then(() => setPriceInitialized(true));
  }, [calculatePrice]);

  const validateAll = () => {
    let isValid = true;

    const quantity = state.quantity.value ? state.quantity.value : 0;

    if (quantity <= 0) {
      isValid = false;
    }

    if (
      state.selectedOption.show_custom_sizes &&
      state.sizeSelectionType === "default" &&
      !state.customSize.value
    ) {
      dispatch({
        type: ProductActionKind.SET_CUSTOM_SIZE_ERROR,
        payload: {
          field: "customSize",
          error: "Please select a size",
          showError: true,
        },
      });
      isValid = false;
    }

    if (state.width.error) {
      isValid = false;
    }

    if (state.height.error) {
      isValid = false;
    }

    return isValid;
  };

  const submitAddToCart = async (files?: FileState[]) => {
    validateAll();

    if (!validateAll()) {
      toast("Please, fill all fields", { type: "error" });

      return;
    }

    dispatch({ type: ProductActionKind.START_FETCHING });

    router.post(
      "/api/cart/add",
      {
        product_id: product.id,
        option_id: state.selectedOption.id,
        addons: state.selectedAddons,
        unit: state.unit,
        width: state.width.value,
        height: state.height.value,
        quantity: state.quantity.value,
        size_id: state.customSize.value,
        files,
      },
      {
        only: ["cart"],
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          toast("Successfully added to cart", {
            type: "success",
            position: "bottom-center",
            theme: "colored",
            onClick: () => router.visit("/cart"),
          });

          dispatch({ type: ProductActionKind.STOP_FETCHING });
        },
      }
    );
  };

  if (!state.calculatedPrice || !priceInitialized) {
    return <LoadingProductCheckoutForm />;
  }

  return (
    <section>
      <ProductOptions product={product} />

      <ProductAddons product={product} />

      {state.selectedOption?.showCalculator ? (
        <div style={{ marginTop: 20 }}>
          <ProductCalculator selectedOption={state.selectedOption} />
        </div>
      ) : null}

      <ProductFormSection>
        <ProductFormSection.Title>Quantity:</ProductFormSection.Title>

        {state.selectedOption.quantity_list ? (
          <ProductQuantityList
            quantityList={state.selectedOption.quantity_list}
            handleChange={(quantity) =>
              dispatch({
                type: ProductActionKind.UPDATE_QUANTITY_OF_PRODUCT,
                payload: { quantity },
              })
            }
          />
        ) : (
          <ProductQuantity
            value={state.quantity.value}
            onChange={(quantity) =>
              dispatch({
                type: ProductActionKind.UPDATE_QUANTITY_OF_PRODUCT,
                payload: { quantity },
              })
            }
          />
        )}

        <h5 className={classes.productCheckoutFormPrice}>
          ${state.calculatedPrice}
        </h5>

        <Button
          variant="primary"
          color="primary-600"
          type="submit"
          onClick={() =>
            state.selectedOption.need_file
              ? dragAndDropRef.current.showModal()
              : submitAddToCart()
          }
          style={{ marginTop: 20, width: "100%", textTransform: "unset" }}
          disabled={state.status === "fetching"}
        >
          Add to cart
        </Button>
      </ProductFormSection>

      <SelectProductFile
        ref={dragAndDropRef}
        submitHandler={(files) => submitAddToCart(files)}
      />
    </section>
  );
}

export default ProductCheckoutForm;
