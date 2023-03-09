import { useAppSelector } from "@/src/hooks";
import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}: FooterProps) => {
  const { homeCategories } = useAppSelector((state) => state.app);

  return (
    <footer className="ps-footer ps-footer--1">
      <div className="ps-footer--top">
        <div className="container">
          <div className="row m-0">
            <div className="col-12 col-sm-4 p-0">
              <p className="text-center">
                <a className="ps-footer__link" href="">
                  <i className="icon-wallet"></i>100% Money back
                </a>
              </p>
            </div>
            <div className="col-12 col-sm-4 p-0">
              <p className="text-center">
                <a className="ps-footer__link" href="">
                  <i className="icon-bag2"></i>Non-contact shipping
                </a>
              </p>
            </div>
            <div className="col-12 col-sm-4 p-0">
              <p className="text-center">
                <a className="ps-footer__link" href="">
                  <i className="icon-truck"></i>Free delivery for order over
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="ps-footer__middle">
          <div className="row">
            <div className="col-12 col-md-7">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="ps-footer--address">
                    <div className="ps-logo">
                      <a href="index.html">
                        <img src="/img/logo.png" />
                      </a>
                    </div>
                    <div className="ps-footer__title">Our store</div>
                    {/* <p>
                      1487 Rocky Horse Carrefour
                      <br />
                      Arlington, TX 16819
                    </p> */}
                    {/* <p>
                      <a
                        target="_blank"
                        href="https://www.google.com/maps/place/Arlington,+TX,+USA/@32.701968,-97.2054529,12z/data=!3m1!4b1!4m8!1m2!2m1!1s1487+Rocky+Horse+Carrefour+Arlington,+TX+16819!3m4!1s0x864e62d2e40898d3:0xb5ef6ac1fa05351!8m2!3d32.735687!4d-97.1080656"
                      >
                        Show on map
                      </a>
                    </p> */}
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="ps-footer--contact">
                    <h5 className="ps-footer__title">Need help</h5>
                    <div className="ps-footer__fax">
                      <i className="icon-telephone"></i> (949) 942-1363{" "}
                    </div>
                    <p className="ps-footer__work">
                      Monday – Friday: 9:00-20:00
                      <br />
                      Saturday: 11:00 – 15:00
                    </p>
                    <hr />
                    <p>
                      <a
                        className="ps-footer__email"
                        href="../../cdn-cgi/l/email-protection.html#8be8e4e5ffeae8ffcbeef3eae6fbe7eea5e8e4e6"
                      >
                        {" "}
                        <i className="icon-envelope"></i>
                        <span
                          className="__cf_email__"
                          data-cfemail="15767a7b6174766155706d74786579703b767a78"
                        >
                          info@signs7.com
                        </span>{" "}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="row">
                <div className="col-6 col-md-8">
                  <div className="ps-footer--block">
                    <h5 className="ps-block__title">Information</h5>
                    <ul className="ps-block__list">
                      <li>
                        <a href="#">About us</a>
                      </li>
                      <li>
                        <a href="#">Delivery information</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-6 col-md-4">
                  <div className="ps-footer--block">
                    <h5 className="ps-block__title">Store</h5>
                    <ul className="ps-block__list">
                      {homeCategories.map((category) => (
                        <li key={`footer-category-${category.id}`}>
                          <Link to={`/catalog/${category.slug}`}>
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
