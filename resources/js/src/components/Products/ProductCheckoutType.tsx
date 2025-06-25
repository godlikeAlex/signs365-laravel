import React from "react";
import FAQProduct from "../FAQProduct";
import { IProduct } from "@/src/types/ProductModel";
import { Link } from "@inertiajs/react";
import ProductSlider from "../ProductSlider";
import ProductCheckoutForm from "../ProductCheckoutForm";
import ProductContactForm from "../ProductContactForm/ProductContactForm";
import ProductBreadcrumb from "./shared/ProductBreadcrumb";
import ProductInfo from "./shared/ProductInfo";

interface Props {
  product: IProduct;
}

const ProductCheckoutType: React.FC<Props> = ({ product }: Props) => {
  return (
    <div className="ps-page--product-variable">
      <div className="container">
        <ProductBreadcrumb
          categories={product.categories}
          productTitle={product.title}
        />

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
                      <ProductInfo
                        productTitle={product.title}
                        productDescription={product.description}
                        categories={product.categories}
                      />

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

                      <ProductCheckoutForm />
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
        </div>
      </div>
    </div>
  );
};

export default ProductCheckoutType;
