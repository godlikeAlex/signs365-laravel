import { useAppSelector } from "@/src/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../Input";

interface Props {}

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const CheckOutSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email(),
  phone: yup.string().required("Phone is required!"),
  address: yup.string().required("Address is required!"),
});

const PaymentForm: React.FC<Props> = ({}: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [stripeInited, setStripeInited] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(CheckOutSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
    },
  });

  const onSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setSubmiting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href.split("?")[0] + "success-payment",
      },
    });

    if (error) {
      setErrorMessage(error.message);

      setSubmiting(false);
    } else {
      setSubmiting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!user ? (
        <Input
          {...register("name")}
          error={errors.name?.message}
          placeholder={"name"}
        />
      ) : null}

      <Input
        {...register("phone")}
        error={errors.phone?.message}
        placeholder={"phone"}
      />

      <Input
        {...register("address")}
        error={errors.address?.message}
        placeholder={"Address"}
      />

      {!user ? (
        <Input
          {...register("email")}
          type="email"
          placeholder={"email"}
          error={errors.email?.message}
        />
      ) : null}

      <PaymentElement />

      <input type={"submit"} value={"Submit Payment"} disabled={submiting} />
    </form>
  );
};

export default PaymentForm;
