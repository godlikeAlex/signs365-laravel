import React, { useState } from "react";
import { Input } from "@/src/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthService } from "@/src/services";
import { toast } from "react-toastify";
import axiosErrorGrab, {
  DEFAULT_ERROR_MESSAGE,
} from "@/src/helpers/axiosErrorGrabber";
import { Link } from "react-router-dom";

interface Props {}

type Inputs = {
  email: string;
};

const ForgotPassword: React.FC<Props> = ({}: Props) => {
  const [isSubmiting, setSubmiting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSubmiting(true);
      await AuthService.sendForgotPasswordRequest(data.email);

      toast("Reset password request has been sent to your email.", {
        type: "success",
      });

      reset();
      setSubmiting(false);
    } catch (error) {
      const axiosError = axiosErrorGrab(error);

      toast(
        axiosError.type === "message"
          ? axiosError.error
          : DEFAULT_ERROR_MESSAGE,
        {
          type: "error",
        }
      );

      setSubmiting(false);
    }
  };

  return (
    <>
      <div className="ps-account">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-12 col-md-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="ps-form--review">
                  <h2 className="ps-form__title">Reset password</h2>

                  <Input
                    {...register("email")}
                    type="email"
                    error={errors.email?.message}
                    disabled={isSubmiting}
                    formType={"profile"}
                    label={"Email"}
                  />

                  <div className="ps-form__submit">
                    <button className="ps-btn ps-btn--warning">Reset</button>
                  </div>
                  <Link className="ps-account__link" to="/login">
                    Login.
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
