import React, { useState } from "react";
import { Button, Input } from "@/src/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthService } from "@/src/services";
import { toast } from "react-toastify";
import axiosErrorGrab, {
  DEFAULT_ERROR_MESSAGE,
} from "@/src/helpers/axiosErrorGrabber";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, usePage } from "@inertiajs/react";

interface Props {}

type Inputs = {
  password: string;
  passwordConfirmation: string;
};

export const ResetPasswordValidation = yup.object({
  password: yup.string().required().min(7),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword: React.FC<Props> = ({}: Props) => {
  const { props } = usePage<{ token: string }>();

  const [isSubmiting, setSubmiting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(ResetPasswordValidation),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSubmiting(true);
      await AuthService.resetPassword(
        props.token || "",
        data.password,
        data.passwordConfirmation
      );

      toast("Success! Your password has been changed.", {
        type: "success",
      });
      setSubmiting(false);
      // navigate("/login");
      reset();
    } catch (error) {
      const axiosError = axiosErrorGrab(error);
      setSubmiting(false);
      toast(
        axiosError.type === "message"
          ? axiosError.error
          : DEFAULT_ERROR_MESSAGE,
        {
          type: "error",
        }
      );
    }
  };

  return (
    <div className="ps-account">
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-12 col-md-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ps-form--review">
                <h2 className="ps-form__title">Reset password</h2>

                <Input
                  {...register("password")}
                  type="password"
                  error={errors.password?.message}
                  disabled={isSubmiting}
                  formType="profile"
                  label="Password"
                />
                <Input
                  {...register("passwordConfirmation")}
                  type="password"
                  error={errors.passwordConfirmation?.message}
                  disabled={isSubmiting}
                  formType="profile"
                  label="Confirm Password"
                />

                <div className="ps-form__submit">
                  <Button type="submit" disabled={isSubmiting}>
                    Update password
                  </Button>
                </div>
                <Link className="ps-account__link" href="/login">
                  Login.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ps-account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Reset Password</h1>
      </form>
    </div>
  );
};

export default ResetPassword;
