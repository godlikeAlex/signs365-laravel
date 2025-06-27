import { SharedInertiaData } from "@/src/types/inertiaTypes";
import React from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import SVGLogo from "@/assets/images/logo.svg";
import SVGPayments from "@/assets/images/payments.svg";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}: FooterProps) => {
  const { homeCategories, cart } = usePage<SharedInertiaData>().props;

  return (
    <footer className="ps-footer ps-footer--5 pt-50">
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
                          src={SVGLogo}
                          style={{ width: 200 }}
                          alt="Signs7"
                        />

                        <h3 className="footer-message">
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
                            <Link
                              href={`/shop/${category.slug}/${product.slug}`}
                            >
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
              <p>Copyright © 2024 Signs7. All Rights Reserved. </p>
            </div>
            <div className="col-12 col-md-6 text-right">
              <img className="payment-light" src={SVGPayments} alt="" />
            </div>

            <div className="col-md-12 text-center footer-bottom-links">
              <Link href="/terms">Terms and Conditions</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
