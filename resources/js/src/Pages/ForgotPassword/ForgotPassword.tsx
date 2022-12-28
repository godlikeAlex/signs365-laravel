import React, { useState } from "react";
import { Input } from "@/src/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthService } from "@/src/services";
import { toast } from "react-toastify";
import axiosErrorGrab, {
  DEFAULT_ERROR_MESSAGE,
} from "@/src/helpers/axiosErrorGrabber";

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          type="email"
          error={errors.email?.message}
          disabled={isSubmiting}
        />

        <input type="submit" disabled={isSubmiting} />
      </form>
    </>
  );
};

export default ForgotPassword;
