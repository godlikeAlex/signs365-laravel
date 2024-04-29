import { PaymentForm, SEOHead } from "@/src/components";
import PaymentService from "@/src/services/PaymentService";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { Head, Link, router, usePage, useRemember } from "@inertiajs/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {}

interface State {
  clientSecret?: string;
  tempOrderID?: number | string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout: React.FC<Props> = (props: Props) => {
  const { cart } = usePage<SharedInertiaData>().props;
  const [state1, setState1] = useRemember(
    {
      with_installation: false,
    },
    "Pages/Cart"
  );

  console.log(state1, "state1");

  const [state, setState] = useState<State>({
    clientSecret: undefined,
    tempOrderID: undefined,
  });

  useEffect(() => {
    if (!cart?.items || cart?.items.length < 1) {
      console.log("need redirect");
      // navigate("/cart");
    }
  }, [cart]);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const { data } = await PaymentService.retrivePaymentIntent();

        setState({
          clientSecret: data.client_secret,
          tempOrderID: data.temp_order_id,
        });
      } catch (error) {
        toast("Error initing payment...", { type: "error" });
      }
    };

    fetchPaymentIntent();
  }, []);

  return (
    <>
      <SEOHead title="Checkout" />

      <div className="ps-checkout">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item">
              <Link href="/cart">Shopping cart</Link>
            </li>
            <li className="ps-breadcrumb__item active" aria-current="page">
              Checkout
            </li>
          </ul>
          <h3 className="ps-checkout__title">Checkout</h3>
          <div className="ps-checkout__content">
            {stripePromise && state.clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: state.clientSecret,
                  locale: "en",
                  fonts: [
                    {
                      cssSrc: "https://fonts.googleapis.com/css?family=Jost",
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
                <PaymentForm tempOrderID={state.tempOrderID} />
              </Elements>
            ) : (
              <div className="row">
                <div className="col-12 col-lg-8">
                  <Skeleton height={40} />
                  <Skeleton height={100} count={2} />
                  <Skeleton height={35} count={6} />
                </div>
                <div className="col-12 col-lg-4">
                  <Skeleton height={55} />
                  <Skeleton height={35} count={8} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
