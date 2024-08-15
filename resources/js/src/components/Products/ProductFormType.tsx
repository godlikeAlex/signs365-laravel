import {
  IProduct,
  IProductCheckout,
  IProductDefault,
} from "@/src/types/ProductModel";
import React from "react";
import FAQProduct from "../FAQProduct";
import ProductBreadcrumb from "./shared/ProductBreadcrumb";
import ProductSlider from "../ProductSlider";
import ProductInfo from "./shared/ProductInfo";
import PricePackage from "../PricePackage";
import ProductContactForm from "../ProductContactForm/ProductContactForm";

interface Props {
  product: IProductDefault;
}

const ProductFormType: React.FC<Props> = ({ product }: Props) => {
  return (
    <div className="ps-page--product-variable">
      <div className="container">
        <ProductBreadcrumb
          categories={product.categories}
          productTitle={product.title}
        />
      </div>
      <div className="ps-page__content" style={{ marginBottom: "20px" }}>
        <div className="ps-product--detail">
          <div className="container">
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
                      <ProductInfo
                        productTitle={product.title}
                        productDescription={product.description}
                        categories={product.categories}
                      />

                      <ul className="ps-product__bundle">
                        <li>
                          <i
                            className="icon-wallet"
                            style={{ color: "#F19100", fontSize: 22 }}
                          ></i>
                          100% Money back
                        </li>
                        <li>
                          <i
                            className="icon-bag2"
                            style={{ color: "#F19100", fontSize: 22 }}
                          ></i>
                          Non-contact shipping
                        </li>
                        <li>
                          <i
                            className="icon-truck"
                            style={{ color: "#F19100", fontSize: 22 }}
                          ></i>
                          Free delivery
                        </li>
                      </ul>

                      <ProductContactForm productSlug={product.slug} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div
            className="ps-product__content mt-50 pt-50 pb-50"
            style={{ background: "rgb(250, 250, 250)" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="ps-title text-center">Prices</h2>
                </div>

                <div className="col-md-4">
                  <PricePackage title="Base Package" price={250} />
                </div>

                <div className="col-md-4">
                  <PricePackage title="Base Package" price={550} />
                </div>

                <div className="col-md-4">
                  <PricePackage title="Base Package" price={999} />
                </div>
              </div>
            </div>
          </div> */}

          {product.faq && (
            <div className="ps-product__content pt-50 pb-50">
              <div className="container">
                <div className="row">
                  <h2 className="ps-title text-center col-md-12">F.A.Q</h2>

                  <div className="col-md-12">
                    <FAQProduct questions={product.faq} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFormType;
