import { PaymentForm } from "@/src/components";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import PaymentService from "@/src/services/PaymentService";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSidebar from "./CheckoutSidebar";

interface CheckoutProps {}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout: React.FC<CheckoutProps> = ({}: CheckoutProps) => {
  const { cart } = useAppSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart?.items || cart?.items.length < 1) {
      navigate("/cart");
    }
  }, [cart]);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const { data } = await PaymentService.retrivePaymentIntent();

        setClientSecret(data.client_secret);
      } catch (error) {
        toast("Error initing payment...", { type: "error" });
      }
    };

    fetchPaymentIntent();
  }, []);

  return (
    <div className="ps-checkout">
      <div className="container">
        <ul className="ps-breadcrumb">
          <li className="ps-breadcrumb__item">
            <Link to="/">Home</Link>
          </li>
          <li className="ps-breadcrumb__item">
            <Link to="/cart">Shopping cart</Link>
          </li>
          <li className="ps-breadcrumb__item active" aria-current="page">
            Checkout
          </li>
        </ul>
        <h3 className="ps-checkout__title">Checkout</h3>
        <div className="ps-checkout__content">
          <form action="">
            <div className="row">
              <div className="col-12 col-lg-8">
                {/* form here */}
                <div className="ps-checkout__form">
                  {stripePromise && clientSecret ? (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        locale: "en",
                        fonts: [
                          {
                            cssSrc:
                              "https://fonts.googleapis.com/css?family=Jost",
                          },
                        ],
                        appearance: {
                          theme: "flat",

                          variables: {
                            colorPrimary: "#103178",
                            colorBackground: "#f0f2f5",
                            colorText: "#103178",
                            fontFamily: '"Jost", sans-serif',
                            spacingUnit: "4px",
                            borderRadius: "40px",
                            // See all possible variables below
                          },
                        },
                      }}
                    >
                      <PaymentForm />
                    </Elements>
                  ) : (
                    <div>
                      <Skeleton height={40} />
                      <Skeleton height={100} count={2} />
                      <Skeleton height={35} count={6} />
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <CheckoutSidebar />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
