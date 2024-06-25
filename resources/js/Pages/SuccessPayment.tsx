import { SEOHead } from "@/src/components";
import PaymentService from "@/src/services/PaymentService";
import { Head, router } from "@inertiajs/react";
import classNames from "classnames";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

interface Props {
  payment_intent: string;
}

interface State {
  loading: boolean;
  status: "completed" | "in proccess" | "canceled";
  uuid?: string;
  email?: string;
}

const SuccessPayment: React.FC<Props> = ({ payment_intent }: Props) => {
  const [state, setState] = React.useState<State>({
    loading: true,
    status: undefined,
    uuid: undefined,
    email: undefined,
  });

  console.log(payment_intent, "payment_intent");

  React.useEffect(() => {
    const fetchPI = async () => {
      try {
        const { data } = await PaymentService.getPaymentIntent(payment_intent);
        console.log("data", data);
        if (data.status === "completed") {
          setState({
            loading: false,
            status: "completed",
            uuid: data.uuid,
          });
        } else if (data.status === "in proccess") {
          setState({
            loading: false,
            status: "in proccess",
            uuid: undefined,
            email: data.email,
          });
        } else if (data.status === "canceled") {
          setState({
            loading: false,
            status: "canceled",
            uuid: undefined,
            email: undefined,
          });
        }
      } catch (error) {
        toast("Something went wrong, contact us to solve the problem", {
          type: "error",
        });

        console.log(error);

        router.visit("/");
      }
    };
    fetchPI();
  }, [payment_intent]);

  const renderTitle = () => {
    switch (state.status) {
      case "completed":
        return "Your order proccesed";
      case "in proccess":
        return "Your payment in process";
      case "canceled":
        return "Your order has been cancelled.";
    }
  };

  const renderMessage = () => {
    if (state.status === "completed") {
      return (
        <p>
          Order ID:{" "}
          <strong
            style={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "monospace",
              fontSize: 16,
            }}
          >
            {state.uuid}
          </strong>
          ;
        </p>
      );
    }

    if (state.status === "in proccess") {
      return (
        <p>
          Your payment is being processed, once the payment is processed we will
          send you an email to <strong>{state.email}</strong>
        </p>
      );
    }

    if (state.status === "canceled") {
      return (
        <p>
          Sorry, your order has been cancelled, a refund will be issued shortly.
          If you have any questions, write to us by email.
        </p>
      );
    }
  };

  return (
    <>
      <SEOHead title="Success" />

      <div className="container">
        <div className="cart-empty text-center title-with-icon-section">
          <div className="">
            <div className="ps-cart__icon" style={{ marginBottom: 10 }}>
              {state.loading ? (
                <Skeleton width={120} height={120} borderRadius={120} />
              ) : (
                <i
                  // className="fa fa-check-circle"
                  className={classNames({
                    "fas fa-check-circle": state.status === "completed",
                    "fas fa-clock": state.status === "in proccess",
                    "fas fa-times": state.status === "canceled",
                  })}
                  style={{ color: "#5b6c8f", fontSize: 120 }}
                ></i>
              )}
            </div>

            {state.loading ? (
              <Skeleton count={2} />
            ) : (
              <>
                <h1
                  className="cart-title"
                  style={{ color: "#103178", marginTop: 20 }}
                >
                  {renderTitle()}
                </h1>

                <>{renderMessage()}</>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPayment;
