import { PaymentForm } from "@/src/components";
import PaymentService from "@/src/services/PaymentService";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import CheckoutSidebar from "./CheckoutSidebar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@/src/hooks";

interface CheckoutContentProps {}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

const CheckOutSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email(),
  phone: yup.string().required("Phone is required!"),
  address: yup.string().required("Address is required!"),
  notes: yup.string().nullable(),
});

const CheckoutContent: React.FC<
  CheckoutContentProps
> = ({}: CheckoutContentProps) => {
  const [clientSecret, setClientSecret] = React.useState(undefined);
  const { user } = useAppSelector((state) => state.auth);
  const [submiting, setSubmiting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(CheckOutSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  React.useEffect(() => {
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
    <form>
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
  );
};

export default CheckoutContent;
