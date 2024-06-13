import React from "react";
import { router, usePage, useRemember } from "@inertiajs/react";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { CartList, SEOHead } from "@/src/components";
import CartListMobile from "@/src/components/CartList/CartListMobile";

interface Props {
  with_installation: boolean;
}

const Cart: React.FC<Props> = (props: Props) => {
  const { cart } = usePage<SharedInertiaData>().props;

  const renderCart = () => {
    return (
      <>
        <SEOHead title="Shopping Cart" />

        <h3 className="ps-shopping__title">
          Shopping cart<sup>({cart.items.length})</sup>
        </h3>
        <div className="ps-shopping__content">
          <div className="row">
            <div className="col-12 col-md-7 col-lg-9">
              <CartList items={cart.items} />
              <CartListMobile items={cart.items} />
            </div>

            <div className="col-12 col-md-5 col-lg-3">
              <div
                className="ps-shopping__label"
                style={{
                  fontSize: 18,
                  padding: "18px 0px",
                  lineHeight: "unset",
                }}
              >
                Cart totals
              </div>
              <div className="ps-shopping__box">
                <div className="ps-shopping__row">
                  <div className="ps-shopping__label">Subtotal</div>
                  <div className="ps-shopping__price">
                    ${cart.total.toLocaleString()}
                  </div>
                </div>

                <div className="ps-shopping__row">
                  <div className="ps-shopping__label">Tax</div>
                  <div className="ps-shopping__price">
                    ${cart.tax.toLocaleString()}
                  </div>
                </div>

                <div className="ps-shopping__row">
                  <div className="ps-shopping__label">Total</div>
                  <div className="ps-shopping__price">
                    ${cart.total_with_tax.toLocaleString()}
                  </div>
                </div>

                <div style={{ marginTop: 15, marginBottom: 15 }}>
                  <label style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      checked={props.with_installation}
                      onChange={() =>
                        router.post("/cart/toggle-with-installation")
                      }
                    />{" "}
                    <span style={{ marginLeft: 10 }}>Add installation</span>
                  </label>
                  <div>Aproximat Estimate: $</div>
                  <div>(we will contact you with price)</div>
                </div>

                <div
                  className="ps-shopping__checkout"
                  style={{ paddingTop: 0 }}
                >
                  <Link className="ps-btn ps-btn--warning" href="checkout">
                    Proceed to checkout
                  </Link>
                  <Link className="ps-shopping__link" href="/">
                    Continue To Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderEmptyCart = () => {
    return (
      <div className="cart-empty text-center title-with-icon-section">
        <div className="ps-cart__icon">
          <i
            className="fa fa-shopping-basket"
            style={{ color: "#5b6c8f", fontSize: 120 }}
          ></i>
        </div>
        <h1 className="cart-title" style={{ color: "#103178", marginTop: 20 }}>
          Your cart is empty
        </h1>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Shopping cart</title>
      </Head>

      <div className="ps-shopping">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item active" aria-current="page">
              Shopping cart
            </li>
          </ul>

          <div>{cart.items.length > 0 ? renderCart() : renderEmptyCart()}</div>
        </div>
      </div>
    </>
  );
};

export default Cart;
