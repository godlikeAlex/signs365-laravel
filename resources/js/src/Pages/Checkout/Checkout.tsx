import { PaymentForm } from "@/src/components";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import PaymentService from "@/src/services/PaymentService";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CheckoutProps {}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout: React.FC<CheckoutProps> = ({}: CheckoutProps) => {
  const { cart } = useAppSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState(undefined);

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
    <div>
      <h1>Checkout</h1>
      {stripePromise && clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Checkout;
