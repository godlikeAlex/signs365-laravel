import PaymentService from "@/src/services/PaymentService";
import classNames from "classnames";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {}

interface State {
  loading: boolean;
  status: "completed" | "in proccess";
  uuid?: string;
  email?: string;
}

const SuccessPayment: React.FC<Props> = ({}: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, setState] = React.useState<State>({
    loading: true,
    status: undefined,
    uuid: undefined,
    email: undefined,
  });

  React.useEffect(() => {
    const fetchPI = async () => {
      try {
        const { data } = await PaymentService.getPaymentIntent(
          searchParams.get("payment_intent")
        );

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

        navigate("/");
      }
    };
    fetchPI();
  }, []);

  return (
    <div className="container">
      <div
        className="cart-empty text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="col-md-6">
          <div
            className="ps-cart__icon"
            style={{ marginTop: 120, marginBottom: 10 }}
          >
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
        </div>

        <div className="col-md-6">
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
                  Your payment is being processed, once the payment is processed
                  we will send you an email to <strong>{state.email}</strong>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
