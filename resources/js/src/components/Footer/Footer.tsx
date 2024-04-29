import { SharedInertiaData } from "@/src/types/inertiaTypes";
import React from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}: FooterProps) => {
  const { homeCategories, cart } = usePage<SharedInertiaData>().props;

  return (
    <footer className="ps-footer ps-footer--5 pt-50">
      {/* <div className="ps-footer--top">
        <div className="container">
          <div className="row m-0">
            <div className="col-12 col-sm-4 p-0">
              <p className="text-center">
                <div className="ps-footer__link" style={{ color: "#103178" }}>
                  <i className="icon-wallet"></i>100% Money back
                </div>
              </p>
            </div>
            <div className="col-12 col-sm-4 p-0">
              <p className="text-center">
                <div className="ps-footer__link" style={{ color: "#103178" }}>
                  <i className="icon-bag2"></i>Non-contact shipping
                </div>
              </p>
            </div>
            <div className="col-12 col-sm-4 p-0">
              <p className="text-center">
                <div className="ps-footer__link" style={{ color: "#103178" }}>
                  <i className="icon-truck"></i>Free delivery for order over
                </div>
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="ps-footer__middle">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="ps-footer--address">
                    <div
                      className="ps-logo-footer"
                      style={{ textAlign: "center" }}
                    >
                      <a href="/">
                        <img
                          src="/img/logo-white.png"
                          style={{ width: 250 }}
                          alt="Signs7"
                        />

                        <h3
                          style={{
                            color: "white",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            marginTop: 10,
                            marginBottom: 50,
                          }}
                        >
                          Everything for your business
                        </h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                {homeCategories.map((category) => (
                  <div
                    className="col-md-4"
                    key={category.id}
                    style={{ textAlign: "center", marginTop: 20 }}
                  >
                    <div className="ps-footer--block">
                      <h5
                        className="ps-block__title"
                        style={{ textTransform: "uppercase" }}
                      >
                        {category.title}
                      </h5>
                      <ul className="ps-block__list">
                        {category.products.map((product) => (
                          <li key={`footer-product-${product.id}`}>
                            <Link href={`/shop/product/${product.slug}`}>
                              {product.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ps-footer--bottom">
          <div className="row">
            <div className="col-12 col-md-6">
              <p>Copyright © 2023 Signs7. All Rights Reserved</p>
            </div>
            <div className="col-12 col-md-6 text-right">
              <img src="img/payment.png" alt="" />
              <img
                className="payment-light"
                src="img/payment-light.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
