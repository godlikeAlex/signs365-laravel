import classNames from "classnames";
import React, { ComponentType, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Path, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../redux/cartSlice";
import {
  clearProductState,
  getProduct,
  getProductVariants,
  selectProductVariant,
  setProduct,
} from "../redux/singleProductSlice";
import { IProduct, IProductVaraint } from "../types/models";
import { Helmet } from "react-helmet";

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

    const {
      loading,
      product,
      currentVaraint,
      productVaraintsLoaded,
      productVariants,
    } = useAppSelector((state) => state.product);

    useEffect(() => {
      return () => {
        dispatch(clearProductState());
      };
    }, []);

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
      const fetchVariants = async () => {
        const varinats = await dispatch(
          getProductVariants({ slug: product.slug })
        ).unwrap();

        if (varinats.length === 0) {
          toast("Variants not found, try reload page", { type: "warning" });
        }
      };

      if (product) {
        fetchVariants();
      }
    }, [product]);

    const handleSelectVariant = (productVariant: IProductVaraint) => {
      dispatch(selectProductVariant(productVariant));
    };

    const handleAddToCart = async () => {
      dispatch(
        addToCart({
          product_id: product.id,
          product_variant_id: currentVaraint.id,
        })
      );
      toast("Successfully added to cart", { type: "success" });
    };

    const handleClose = () => {
      navigate(-1);
    };

    const renderVariants = () => (
      <>
        {productVaraintsLoaded && currentVaraint ? (
          <span className="ps-product__price">
            ${currentVaraint.price.toLocaleString()}
          </span>
        ) : (
          <Skeleton height={52} width={"35%"} />
        )}

        <h6 style={{ marginTop: 20 }}>Variants</h6>
        {productVaraintsLoaded ? (
          <div className="row no-gutters" style={{ width: "100%" }}>
            {productVariants.map((productVariant) => (
              <div className="col-md-4 cust-padding">
                <div
                  className={classNames("product-variant", {
                    "active-variant": productVariant.id === currentVaraint.id,
                  })}
                  onClick={() => handleSelectVariant(productVariant)}
                >
                  <h6>{productVariant.label}</h6>
                  <h6
                    style={{
                      color: "#fd8d27",
                      marginBottom: 0,
                      marginTop: 5,
                    }}
                  >
                    ${productVariant.price.toLocaleString()}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="col-md-12"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "33%" }}>
              <Skeleton height={67} width={"100%"} />
            </div>

            <div style={{ width: "33%" }}>
              <Skeleton height={67} width={"100%"} />
            </div>

            <div style={{ width: "33%" }}>
              <Skeleton height={67} width={"100%"} />
            </div>
          </div>
        )}
      </>
    );

    return (
      <>
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
      </>
    );
  };
}

export default withProductControl;
