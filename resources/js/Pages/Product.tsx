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
  ProductContactForm,
  ProductSlider,
  SEOHead,
} from "@/src/components";
import SelectProductFile, {
  SelectProductFileRef,
} from "@/src/components/SelectProductFile/SelectProductFile";
import { jsonLdScriptProps } from "react-schemaorg";

interface Props {
  product: { data: IProduct };
}

interface ProductProps {
  product: IProduct;
}

function Product({ product }: ProductProps) {
  const { state } = useContext(MainProductContext);
  const dragAndDropRef = React.useRef<SelectProductFileRef>(null);

  return (
    <>
      <SEOHead
        title={product.seo_title}
        description={product.seo_desc}
        keywords={product.seo_keywords}
      >
        <script
          {...jsonLdScriptProps<DTS.Product>({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            brand: "Signs7",
            image:
              product.images.length > 0
                ? `/storage/${product.images[0].path}`
                : undefined,
          })}
        />
      </SEOHead>

      <div className="ps-page--product-variable">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item">
              <span>Shop</span>
            </li>
            {product.categories.length > 0 && (
              <li
                className="ps-breadcrumb__item"
                key={`breadcumbs-${product.categories[0].slug}`}
              >
                <Link href={`/shop/category/${product.categories[0].slug}`}>
                  {product.categories[0].title}
                </Link>
              </li>
            )}

            <li className="ps-breadcrumb__item">
              <span>{product.title}</span>
            </li>
          </ul>

          <div className="ps-page__content" style={{ marginBottom: "20px" }}>
            <div className="ps-product--detail">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-12 col-xl-6">
                      <ProductSlider
                        images={product.images}
                        productName={product.title}
                      />
                    </div>
                    <div className="col-12 col-xl-6">
                      <div className="ps-product__info">
                        <div className="ps-product__branch">
                          {product.categories?.map((category) => (
                            <Link
                              href={`/shop/category/${category.slug}`}
                              key={`cat-${category.slug}`}
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                        <div className="ps-product__title">
                          <a>{product.title}</a>
                        </div>
                        <div className="ps-product__desc">
                          <p
                            className={"product_modal_desc"}
                            dangerouslySetInnerHTML={{
                              __html: product.description,
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
                              <i className="icon-truck"></i>Free delivery
                            </li>
                          </ul>
                        </div>
                        <div>
                          {product.with_checkout ? (
                            <ProductCheckoutForm />
                          ) : (
                            <ProductContactForm productSlug={product.slug} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {product.faq && (
                <div className="ps-product__content mt-50">
                  <h2 className="ps-title">F.A.Q</h2>

                  <FAQProduct questions={product.faq} />
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

  useEffect(() => {
    dispatch({ type: ProductActionKind.INIT_PRODUCT, payload: product.data });
  }, [product]);

  const value = { state, dispatch };

  return (
    <MainProductContext.Provider value={value}>
      <Product product={product.data} />
    </MainProductContext.Provider>
  );
};
