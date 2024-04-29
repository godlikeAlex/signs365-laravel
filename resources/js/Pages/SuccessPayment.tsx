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
  status: "completed" | "in proccess";
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

  React.useEffect(() => {
    const fetchPI = async () => {
      try {
        const { data } = await PaymentService.getPaymentIntent(payment_intent);

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
  }, []);

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
                    "fa fa-check-circle": state.status === "completed",
                    "fa fa-clock-o": state.status === "in proccess",
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
                  {state.status === "completed"
                    ? "Your order proccesed"
                    : "Your payment in process"}
                </h1>
                {state.status === "completed" ? (
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
                ) : (
                  <p>
                    Your payment is being processed, once the payment is
                    processed we will send you an email to{" "}
                    <strong>{state.email}</strong>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPayment;
