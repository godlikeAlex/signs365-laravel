import classNames from "classnames";
import React, { ComponentType, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Path, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../redux/cartSlice";
import {
  clearProductState,
  getProduct,
  setProduct,
} from "../redux/singleProductSlice";
import { IProduct, IProductVaraint } from "../types/models";
import { Helmet } from "react-helmet";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";
import { FormProvider, useForm } from "react-hook-form";
import {
  ProductFormContext,
  ProductFormContextType,
} from "../contexts/ProductFormContext";
import { useDebounceEffect } from "ahooks";
import { CartService } from "../services";

interface ILocation extends Path {
  state: {
    product: IProduct;
  };
}

export interface WithProductsControlProps {
  product: IProduct;
  loading: boolean;

  handleClose: () => void;
  renderVariants: () => JSX.Element;
  handleAddToCart: () => void;
}

export function withProductControl<T extends WithProductsControlProps>(
  Component: ComponentType<T>
) {
  return function (hocProps: Omit<T, keyof WithProductsControlProps>) {
    const params = useParams<"slug">();
    const location: ILocation = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, product, addons, selectedOption } = useAppSelector(
      (state) => state.product
    );

    const [state, setState] = useState<ProductFormContextType>({
      selectedAddons: [],
      selectedOption: undefined,
      disabled: false,
      width: {
        error: undefined,
        value: 1,
        showError: false,
      },
      height: {
        error: undefined,
        value: 1,
        showError: false,
      },
      unit: "inches",
      price: 100,
      quantity: 1,
    });

    useEffect(() => {
      return () => {
        dispatch(clearProductState());
      };
    }, []);

    useEffect(() => {
      setState((state) => ({ ...state, disabled: state.quantity === 0 }));
    }, [state.quantity]);

    useEffect(() => {
      const fetchProduct = async () => {
        if (!location?.state?.product) {
          // need fetch PRODUCT if joined by link
          try {
            dispatch(getProduct({ slug: params.slug })).unwrap();
          } catch (error) {
            toast("Product not found", { type: "error" });
            console.log(error);
            navigate("/");
          }
        } else {
          dispatch(setProduct(location.state.product));
        }
      };

      fetchProduct();
    }, [params]);

    useEffect(() => {
      const selectedAddons = addons
        .filter((a) => a.isSelected)
        .map((selectedAddon) => {
          let error;

          if (selectedAddon.withQuantity) {
            if (selectedAddon.quantity > selectedAddon.validation["max-qty"]) {
              error = `Max value for addon is - ${selectedAddon.validation["max-qty"]}`;
            } else if (
              selectedAddon.quantity < selectedAddon.validation["min-qty"]
            ) {
              error = `Min value for addon is - ${selectedAddon.validation["min-qty"]}`;
            } else {
              error = undefined;
            }
          }

          return {
            ...selectedAddon,
            error,
            showError: error ? true : false,
          };
        });

      setState((state) => ({ ...state, selectedAddons }));
    }, [addons]);

    useEffect(() => {
      setState((state) => ({ ...state, selectedOption }));
    }, [selectedOption]);

    // Fetch Prices on update fields.
    useDebounceEffect(() => {
      const fetchPriceViaCalculator = async () => {
        setState((state) => ({ ...state, disabled: true }));

        const {
          width,
          height,
          quantity,
          selectedAddons,
          selectedOption,
          unit,
        } = state;

        const { data } = await CartService.calculateSinglePrice(
          product.id,
          selectedOption,
          selectedAddons,
          unit,
          width.value,
          height.value
        );

        setState((state) => ({ ...state, disabled: false, price: 25 }));
      };

      fetchPriceViaCalculator();
    }, [
      state.width,
      state.height,
      state.selectedOption,
      state.selectedAddons,
      state.quantity,
      state.unit,
      product,
    ]);

    const handleSelectVariant = (productVariant: IProductVaraint) => {
      // dispatch(selectProductVariant(productVariant));
    };

    const handleAddToCart = async () => {
      // dispatch(
      //   addToCart({
      //     product_id: product.id,
      //     product_variant_id: currentVaraint.id,
      //   })
      // );
      toast("Successfully added to cart", { type: "success" });
    };

    const handleClose = () => {
      navigate(-1);
    };

    const renderVariants = () => (
      <div className="row">
        <div className="col-md-12">
          <h6>Options: {currentVaraint?.label}</h6>
        </div>

        {productVaraintsLoaded ? (
          <div
            className="col-md-12"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {productVariants.map((productVariant) => (
              <div
                className={classNames("product-variant", {
                  "active-variant": productVariant.id === currentVaraint.id,
                })}
                onClick={() => handleSelectVariant(productVariant)}
              >
                <h6 style={{ marginBottom: 0 }}>{productVariant.label}</h6>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="col-md-12"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ width: "33%" }}>
              <Skeleton height={35} width={"100%"} />
            </div>
            <div style={{ width: "33%" }}>
              <Skeleton height={35} width={"100%"} />
            </div>
            <div style={{ width: "33%" }}>
              <Skeleton height={35} width={"100%"} />
            </div>
          </div>
        )}

        <div className="col-md-12" style={{ marginTop: 20 }}>
          {productVaraintsLoaded && currentVaraint ? (
            <span className="ps-product__price">${currentVaraint.price}</span>
          ) : (
            <Skeleton height={52} width={"35%"} />
          )}
        </div>
      </div>
    );

    return (
      <ProductFormContext.Provider value={{ state, setState }}>
        {product ? (
          <Helmet>
            <title>{product?.title}</title>
          </Helmet>
        ) : null}

        <Component
          {...(hocProps as T)}
          {...{
            product,
            loading,
            handleAddToCart,
            handleClose,
            renderVariants,
          }}
        />
      </ProductFormContext.Provider>
    );
  };
}

export default withProductControl;
