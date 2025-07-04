import classNames from "classnames";
import React, { ComponentType, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Path,
  useBeforeUnload,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../redux/cartSlice";
import {
  clearProductState,
  getProduct,
  setProduct,
} from "../redux/singleProductSlice";
import { IProductVaraint } from "../types/models";
import { Helmet } from "react-helmet";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";
import { FormProvider, useForm } from "react-hook-form";
import {
  ProductFormContext,
  ProductFormContextType,
} from "../contexts/ProductFormContext";
import { useDebounceEffect } from "ahooks";
import { CartService } from "../services";
import { IProduct } from "../types/ProductModel";
import { FileState } from "../components/Dropzone/Dropzone";

interface MethodsProductProps {
  handleClose: () => void;
  renderVariants: () => JSX.Element;
  submitAddToCart: (files?: FileState[]) => Promise<void>;
}

type LoadingProudctProps = MethodsProductProps & {
  loading: true;
};

type LoadedProductProps = MethodsProductProps & {
  loading: false;
  product: IProduct;
};

export type WithProductsControlProps = LoadingProudctProps | LoadedProductProps;

export function withProductControl<
  T extends WithProductsControlProps = WithProductsControlProps
>(Component: ComponentType<T>) {
  return function (props: Omit<T, keyof WithProductsControlProps>) {
    const params = useParams<"slug">();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, product, addons, selectedOption } = useAppSelector(
      (state) => state.product
    );
    const location = useLocation();

    const [state, setState] = useState<ProductFormContextType>({
      selectedAddons: [],
      selectedOption: undefined,
      typeSizeSelection: "custom",
      highlightErrors: false,
      disabled: false,
      firstPriceLoaded: true,
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
      customSize: {
        error: undefined,
        value: undefined,
      },
      unit: "inches",
      price: 100,
      quantity: 1,
      calculatedPrice: undefined,
    });

    const isProductLoading = React.useMemo(() => {
      if (!product) return true;

      if (product.with_checkout === false) {
        return loading;
      } else {
        return loading || state.calculatedPrice === undefined;
      }
    }, [loading, product, state.calculatedPrice]);

    const validationRules = {
      customSize:
        selectedOption?.type !== "sqft" && state.typeSizeSelection === "default"
          ? state.customSize.value !== undefined
          : true,
    };

    // useEffect(() => {
    //   return () => {
    //     console.log("Hello World");
    //     // dispatch(clearProductState());
    //   };
    // }, []);

    useEffect(() => {
      setState((state) => ({ ...state, disabled: state.quantity === 0 }));
    }, [state.quantity]);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          await dispatch(getProduct({ slug: params.slug })).unwrap();
        } catch (error) {
          toast("Product not found", { type: "error" });
          console.log("Product SHOW", error);
          navigate("/not-found", { replace: true });
        }
      };

      fetchProduct();

      return () => {
        dispatch(clearProductState());
        setState({
          selectedAddons: [],
          selectedOption: undefined,
          firstPriceLoaded: true,
          typeSizeSelection: "custom",
          highlightErrors: false,
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
          customSize: {
            error: undefined,
            value: undefined,
          },
          unit: "inches",
          price: 100,
          quantity: 1,
          calculatedPrice: undefined,
        });
      };
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
        if (!product) {
          return;
        }

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
          product?.id,
          selectedOption.id,
          selectedAddons,
          unit,
          width.value,
          height.value,
          quantity
        );

        setState((state) => ({
          ...state,
          disabled: false,
          calculatedPrice: data.price,
        }));
      };

      fetchPriceViaCalculator();
    }, [
      state.width,
      state.height,
      state.selectedOption,
      state.selectedAddons,
      state.quantity,
      state.unit,
      state.customSize,
      // product,
    ]);

    const handleSelectVariant = (productVariant: IProductVaraint) => {
      // dispatch(selectProductVariant(productVariant));
    };

    const submitAddToCart = async (files?: FileState[]) => {
      const isValidForm = Object.values(validationRules).every((key) => key);

      if (!isValidForm) {
        setState((state) => ({
          ...state,
          highlightErrors: true,
          disabled: false,
        }));
        toast("Please, fill all fields", { type: "error" });

        return;
      }

      setState((state) => ({
        ...state,
        disabled: true,
      }));

      await dispatch(
        addToCart({
          product_id: product.id,
          option_id: selectedOption.id,
          addons: state.selectedAddons,
          unit: state.unit,
          width: state.width.value,
          height: state.height.value,
          quantity: state.quantity,
          size_id: state.customSize.value,
          files,
        })
      ).unwrap();

      toast("Successfully added to cart", { type: "success" });

      setState((state) => ({
        ...state,
        disabled: false,
      }));
    };

    const handleClose = () => {
      navigate(-1);
    };

    const renderVariants = () => {};

    return (
      <ProductFormContext.Provider value={{ state, setState, validationRules }}>
        {product ? (
          <Helmet>
            <title>
              {product.seo_title ? product.seo_title : product.title}
            </title>

            {product.seo_desc ? (
              <meta name="description" content={product.seo_desc} />
            ) : null}

            {product.seo_keywords ? (
              <meta name="keywords" content={product.seo_keywords} />
            ) : null}
          </Helmet>
        ) : (
          <Helmet>
            <title>Loading Product</title>
          </Helmet>
        )}

        <Component
          {...({
            product,
            loading: isProductLoading,
            submitAddToCart,
            handleClose,
            renderVariants,
          } as T)}
        />
      </ProductFormContext.Provider>
    );
  };
}

export default withProductControl;
