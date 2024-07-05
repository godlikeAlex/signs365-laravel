import { useAppSelector } from "@/src/hooks";
import CheckoutSidebar from "@/src/Pages/Checkout/CheckoutSidebar";
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
import ClipLoader from "react-spinners/ClipLoader";
import { BeatLoader } from "react-spinners";
import PaymentService from "@/src/services/PaymentService";
import { router, usePage, useRemember } from "@inertiajs/react";
import { SharedInertiaData } from "@/src/types/inertiaTypes";

interface Props {
  paymentIntentId: number | string;
}

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  user_id?: any;
};

const CheckOutSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required("Phone is required!"),
  address: yup.string().required("Address is required!"),
  notes: yup.string().nullable(),
  user_id: yup.string().nullable(),
});

const PaymentForm: React.FC<Props> = ({ paymentIntentId }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { auth } = usePage<SharedInertiaData>().props;
  const [state, setState] = useRemember(
    {
      with_installation: false,
    },
    "Pages/Checkout"
  );

  const [errorMessage, setErrorMessage] = useState(null);

  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(CheckOutSchema),
    defaultValues: {
      name: auth?.user?.name ?? "",
      email: auth?.user?.email ?? "",
      user_id: auth?.user?.id ?? undefined,
    },
  });

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    setSubmitting(true);

    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] == null) {
        delete data[key];
      }
    });

    router.post(`/api/checkout/update-order/${paymentIntentId}`, data, {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: async () => {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: window.location.href.split("?")[0] + "/success-payment",
            payment_method_data: {
              billing_details: {
                address: {
                  country: "US",
                  postal_code: "",
                  state: "",
                  city: "",
                  line1: "",
                  line2: "",
                },
              },
            },
          },
        });

        if (error) {
          setErrorMessage(error.message);

          setSubmitting(false);
        } else {
          setSubmitting(false);
        }
      },
      onError: () => {
        setSubmitting(false);
      },
    });

    // await PaymentService.updateOrderInCheckout(paymentIntentId as string, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="ps-checkout__form">
            <h3 className="ps-checkout__heading">Billing details</h3>
            <div className="row">
              <div className="col-12 col-md-12">
                {!auth.user ? (
                  <Input
                    {...register("name")}
                    error={errors.name?.message}
                    placeholder={"Your name"}
                    disabled={submitting}
                    label={"Name"}
                    formType="checkout"
                  />
                ) : null}
              </div>
              <div className="col-12 col-md-12">
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder={"Phone number"}
                  error={errors.phone?.message}
                  disabled={submitting}
                  formType="checkout"
                  label="Phone"
                />
              </div>
              <div className="col-12 col-md-12">
                {!auth.user ? (
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder={"Email"}
                    error={errors.email?.message}
                    disabled={submitting}
                    formType="checkout"
                    label="Email"
                  />
                ) : null}
              </div>

              <div className="col-12 col-md-12">
                <Input
                  {...register("address")}
                  type="tel"
                  placeholder={"Address"}
                  error={errors.address?.message}
                  disabled={submitting}
                  formType="checkout"
                  label="Address"
                />
              </div>

              <div className="col-12">
                <div className="ps-checkout__group">
                  <label className="ps-checkout__label">
                    Order notes (optional)
                  </label>
                  <textarea
                    className="ps-textarea"
                    rows={7}
                    {...register("notes")}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                  ></textarea>
                  {errors.notes?.message ? (
                    <p
                      style={{
                        textTransform: "capitalize",
                        color: "#ff5252",
                      }}
                    >
                      {errors.notes?.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="col-12">
                {submitting ? (
                  <div className="overlay-loading">
                    <BeatLoader />
                  </div>
                ) : null}

                <PaymentElement
                  options={{
                    fields: { billingDetails: { address: "never" } },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <CheckoutSidebar
            submitting={submitting}
            setSubmitting={(submitting) => setSubmitting(submitting)}
          />
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
