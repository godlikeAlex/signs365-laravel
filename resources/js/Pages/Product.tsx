import { ProductShow } from "@/src/Pages";
import ModalContentWithForm from "@/src/Pages/ModalShowProduct/ModalContentWithForm";
import {
  FAQProduct,
  ProductCalculator,
  ProductOptions,
  ProductQuantity,
  ProductSlider,
} from "@/src/components";
import { FileState } from "@/src/components/Dropzone/Dropzone";
import ProductAddons from "@/src/components/ProductAddons/ProductAddons";
import SelectProductFile from "@/src/components/SelectProductFile";
import { SelectProductFileRef } from "@/src/components/SelectProductFile/SelectProductFile";
import {
  ProductFormContext,
  ProductFormContextType,
} from "@/src/contexts/ProductFormContext";
import withProductControl from "@/src/hoc/withProductControl";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { addToCart } from "@/src/redux/cartSlice";
import { getProduct, setProduct } from "@/src/redux/singleProductSlice";
import { CartService } from "@/src/services";
import { IProduct } from "@/src/types/ProductModel";
import { Head, Link, router } from "@inertiajs/react";
import { useDebounceEffect } from "ahooks";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

interface Props {
  product: { data: IProduct };
}

const Product: React.FC<Props> = ({ product: productFromServer }: Props) => {
  const dragAndDropRef = useRef<SelectProductFileRef>(null);
  const dispatch = useAppDispatch();
  const { product, addons, selectedOption } = useAppSelector(
    (state) => state.product
  );

  const [state, setState] = useState<ProductFormContextType>({
    selectedAddons: [],
    selectedOption: undefined,
    typeSizeSelection: "custom",
    firstPriceLoaded: false,
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

  const validationRules = {
    customSize:
      selectedOption?.type !== "sqft" && state.typeSizeSelection === "default"
        ? state.customSize.value !== undefined
        : true,
  };

  useEffect(() => {
    dispatch(setProduct(productFromServer.data));
  }, []);

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
      if (!product || !state.selectedOption) {
        return;
      }

      setState((state) => ({ ...state, disabled: true }));

      const { width, height, quantity, selectedAddons, selectedOption, unit } =
        state;

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
        firstPriceLoaded: true,
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

    router.post(
      "/api/cart/add",
      {
        product_id: product.id,
        option_id: selectedOption.id,
        addons: state.selectedAddons,
        unit: state.unit,
        width: state.width.value,
        height: state.height.value,
        quantity: state.quantity,
        size_id: state.customSize.value,
        files,
      },
      {
        forceFormData: true,
        onSuccess: () => {
          toast("Successfully added to cart", { type: "success" });

          setState((state) => ({
            ...state,
            disabled: false,
          }));
        },
      }
    );
  };

  const renderWithCheckout = () => {
    if (state.firstPriceLoaded === false) {
      return (
        <div
          className="ps-product__meta"
          style={{
            marginTop: 0,
            borderBottom: "1px solid #f0f2f5",
          }}
        >
          <div>
            <Skeleton height={45} />
            <Skeleton height={45} />
          </div>

          <div style={{ marginTop: 20 }}>
            <Skeleton height={140} />
          </div>
        </div>
      );
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
          {/* <div> */}
          <ProductOptions />
          {/* </div> */}

          {state.selectedOption && state.selectedOption.addons.length > 0 ? (
            <div style={{ marginTop: 20 }}>
              <ProductAddons />
            </div>
          ) : null}

          {state.selectedOption?.showCalculator ? (
            <div style={{ marginTop: 20 }}>
              <ProductCalculator
                {...{
                  state,
                  setState,
                  validationRules,
                }}
              />
            </div>
          ) : null}
        </div>

        <div>
          <h6 className="label-product-show">Quantity:</h6>

          {state.firstPriceLoaded ? (
            <ProductQuantity
              value={state.quantity}
              onChange={(value) =>
                setState((state) => ({
                  ...state,
                  quantity: value,
                }))
              }
            />
          ) : (
            <>
              <Skeleton height={40} />
            </>
          )}

          <span className="ps-product__price">
            {state.firstPriceLoaded ? (
              <>{state.calculatedPrice} $</>
            ) : (
              <>
                <Skeleton width={120} />
              </>
            )}
          </span>

          <button
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
          </button>
        </div>
      </>
    );
  };

  const renderModalContent = () => {
    return (
      <div className="ps-product__meta">
        <ModalContentWithForm product={product} />
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>
          {productFromServer.data.seo_title
            ? productFromServer.data.seo_title
            : productFromServer.data.title}
        </title>

        {productFromServer.data.seo_desc ? (
          <meta name="description" content={productFromServer.data.seo_desc} />
        ) : null}

        {productFromServer.data.seo_keywords ? (
          <meta name="keywords" content={productFromServer.data.seo_keywords} />
        ) : null}
      </Head>

      <ProductFormContext.Provider value={{ state, setState, validationRules }}>
        <div className="ps-page--product-variable">
          <div className="container">
            <ul className="ps-breadcrumb">
              <li className="ps-breadcrumb__item">
                <Link href="/">Home</Link>
              </li>
              <li className="ps-breadcrumb__item">
                <span>Shop</span>
              </li>
              {productFromServer.data.categories.length > 0 && (
                <li
                  className="ps-breadcrumb__item"
                  key={`breadcumbs-${productFromServer.data.categories[0].slug}`}
                >
                  <Link
                    href={`/shop/category/${productFromServer.data.categories[0].slug}`}
                  >
                    {productFromServer.data.categories[0].title}
                  </Link>
                </li>
              )}

              <li className="ps-breadcrumb__item">
                <span>{productFromServer.data.title}</span>
              </li>
            </ul>

            <div className="ps-page__content" style={{ marginBottom: "20px" }}>
              <div className="ps-product--detail">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-12 col-xl-6">
                        <ProductSlider
                          images={productFromServer.data.images}
                          productName={productFromServer.data.title}
                        />
                      </div>
                      <div className="col-12 col-xl-6">
                        <div className="ps-product__info">
                          <div className="ps-product__branch">
                            {productFromServer.data.categories?.map(
                              (category) => (
                                <Link
                                  href={`/shop/category/${category.slug}`}
                                  key={`cat-${category.slug}`}
                                >
                                  {category.title}
                                </Link>
                              )
                            )}
                          </div>
                          <div className="ps-product__title">
                            <a>{productFromServer.data.title}</a>
                          </div>
                          <div className="ps-product__desc">
                            <p
                              className={"product_modal_desc"}
                              dangerouslySetInnerHTML={{
                                __html: productFromServer.data.description,
                              }}
                            ></p>
                          </div>
                          <div>
                            <ul className="ps-product__bundle">
                              <li>
                                <i className="icon-wallet"></i>100% Money back
                              </li>
                              <li>
                                <i className="icon-bag2"></i>Non-contact
                                shipping
                              </li>
                              <li>
                                <i className="icon-truck"></i>Free delivery for
                                order over $200
                              </li>
                            </ul>
                          </div>
                          <div>
                            {productFromServer.data.with_checkout
                              ? renderWithCheckout()
                              : renderModalContent()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {productFromServer.data.faq && (
                  <div className="ps-product__content mt-50">
                    <h2 className="ps-title">F.A.Q</h2>

                    <FAQProduct questions={productFromServer.data.faq} />
                  </div>
                )}
              </div>

              <SelectProductFile
                ref={dragAndDropRef}
                submitHandler={(files) => submitAddToCart(files)}
              />
            </div>
          </div>
        </div>
      </ProductFormContext.Provider>
    </>
  );
};

export default Product;
