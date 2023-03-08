import React, { useState } from "react";
import { Input } from "@/src/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthService } from "@/src/services";
import { toast } from "react-toastify";
import axiosErrorGrab, {
  DEFAULT_ERROR_MESSAGE,
} from "@/src/helpers/axiosErrorGrabber";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const params = useParams<"token">();

  const [isSubmiting, setSubmiting] = useState(false);
  const navigate = useNavigate();

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
        params.token || "",
        data.password,
        data.passwordConfirmation
      );

      toast("Success! Your password has been changed.", {
        type: "success",
      });
      setSubmiting(false);
      navigate("/login");
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Reset Password</h1>
        <Input
          {...register("password")}
          type="password"
          error={errors.password?.message}
          disabled={isSubmiting}
          formType="profile"
        />
        <Input
          {...register("passwordConfirmation")}
          type="password"
          error={errors.passwordConfirmation?.message}
          disabled={isSubmiting}
          formType="profile"
        />

        <input type="submit" disabled={isSubmiting} />
      </form>
    </>
  );
};

export default ResetPassword;
