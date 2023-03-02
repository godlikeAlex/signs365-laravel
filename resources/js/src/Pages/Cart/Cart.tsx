import { CartList } from "@/src/components";
import CartListMobile from "@/src/components/CartList/CartListMobile";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { clearCart } from "@/src/redux/cartSlice";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CartProps {}

const Cart: React.FC<CartProps> = ({}: CartProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart, loaded } = useAppSelector((state) => state.cart);

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart()).unwrap();

      toast(`Successfully cleared`, {
        type: "success",
      });
    } catch (error) {
      toast("An error occurred while clearing cart", { type: "error" });
    }
  };

  if (!loaded) {
    return <h2>Cart is loading...</h2>;
  }

  const renderCart = () => {
    return (
      <>
        <h3 className="ps-shopping__title">
          Shopping cart<sup>({cart.items.length})</sup>
        </h3>
        <div className="ps-shopping__content">
          <div className="row">
            <div className="col-12 col-md-7 col-lg-9">
              {/* content. List and etc */}
              <CartListMobile items={cart.items} />
              <CartList items={cart.items} />
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
                <div className="ps-shopping__checkout">
                  <Link className="ps-btn ps-btn--warning" to="checkout">
                    Proceed to checkout
                  </Link>
                  <Link className="ps-shopping__link" to="/">
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
      <div className="cart-empty text-center">
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
    <div className="ps-shopping">
      <div className="container">
        <ul className="ps-breadcrumb">
          <li className="ps-breadcrumb__item">
            <Link to="/">Home</Link>
          </li>
          <li className="ps-breadcrumb__item active" aria-current="page">
            Shopping cart
          </li>
        </ul>

        <div>{cart.items.length > 0 ? renderCart() : renderEmptyCart()}</div>
      </div>
    </div>
  );
};

export default Cart;
