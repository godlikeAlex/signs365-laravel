import React, { useContext, useEffect } from "react";
import MainProductContext from "../src/contexts/MainProductContext";
import ProductReducer, {
  ProductActionKind,
} from "@/src/reducers/ProductReducer";
import { IProduct } from "@/src/types/ProductModel";
import { Link } from "@inertiajs/react";
import {
  FAQProduct,
  ProductCheckoutForm,
  ProductSlider,
} from "@/src/components";
import SelectProductFile, {
  SelectProductFileRef,
} from "@/src/components/SelectProductFile/SelectProductFile";

interface Props {
  product: { data: IProduct };
}

function Product() {
  const { state, dispatch } = useContext(MainProductContext);
  const dragAndDropRef = React.useRef<SelectProductFileRef>(null);

  if (state.status === "idle") {
    return null;
  }

  return (
    <>
      <div className="ps-page--product-variable">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item">
              <span>Shop</span>
            </li>
            {state.product.categories.length > 0 && (
              <li
                className="ps-breadcrumb__item"
                key={`breadcumbs-${state.product.categories[0].slug}`}
              >
                <Link
                  href={`/shop/category/${state.product.categories[0].slug}`}
                >
                  {state.product.categories[0].title}
                </Link>
              </li>
            )}

            <li className="ps-breadcrumb__item">
              <span>{state.product.title}</span>
            </li>
          </ul>

          <div className="ps-page__content" style={{ marginBottom: "20px" }}>
            <div className="ps-product--detail">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-12 col-xl-6">
                      <ProductSlider
                        images={state.product.images}
                        productName={state.product.title}
                      />
                    </div>
                    <div className="col-12 col-xl-6">
                      <div className="ps-product__info">
                        <div className="ps-product__branch">
                          {state.product.categories?.map((category) => (
                            <Link
                              href={`/shop/category/${category.slug}`}
                              key={`cat-${category.slug}`}
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                        <div className="ps-product__title">
                          <a>{state.product.title}</a>
                        </div>
                        <div className="ps-product__desc">
                          <p
                            className={"product_modal_desc"}
                            dangerouslySetInnerHTML={{
                              __html: state.product.description,
                            }}
                          ></p>
                        </div>
                        <div>
                          <ul className="ps-product__bundle">
                            <li>
                              <i className="icon-wallet"></i>100% Money back
                            </li>
                            <li>
                              <i className="icon-bag2"></i>Non-contact shipping
                            </li>
                            <li>
                              <i className="icon-truck"></i>Free delivery for
                              order over $200
                            </li>
                          </ul>
                        </div>
                        <div>
                          {state.product.with_checkout ? (
                            <ProductCheckoutForm />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {state.product.faq && (
                <div className="ps-product__content mt-50">
                  <h2 className="ps-title">F.A.Q</h2>

                  <FAQProduct questions={state.product.faq} />
                </div>
              )}
            </div>

            <SelectProductFile
              ref={dragAndDropRef}
              // submitHandler={(files) => submitAddToCart(files)}
              submitHandler={(files) => true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ({ product }: Props) => {
  const [state, dispatch] = React.useReducer(ProductReducer, {
    status: "idle",
    product: null,
    selectedOption: undefined,
    selectedAddons: [],
    price: undefined,
    unit: "feet",
  });

  console.log(product);

  useEffect(() => {
    dispatch({ type: ProductActionKind.INIT_PRODUCT, payload: product.data });
  }, [product]);

  const value = { state, dispatch };

  return (
    <MainProductContext.Provider value={value}>
      <Product />
    </MainProductContext.Provider>
  );
};
