import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import * as yup from "yup";
import { ResetPasswordParams } from "@/src/types/servicesParams";
import UserService from "@/src/services/UserService";
import axiosErrorGrab, {
  isCustomAxisError,
} from "@/src/helpers/axiosErrorGrabber";
import { toast } from "react-toastify";

interface Props {}

export const ResetPasswordSchema = yup.object({
  oldPassword: yup.string().required(),
  newPassword: yup.string().required().min(7),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const UpdatePasswordForm: React.FC<Props> = ({}: Props) => {
  const [isSubmiting, setIsSubmiting] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<ResetPasswordParams>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordParams> = async (data) => {
    try {
      await UserService.editPassword(data);

      toast("Password has been successfully changed!", { type: "success" });
    } catch (error) {
      setIsSubmiting(false);

      const err = axiosErrorGrab(error);

      if (!isCustomAxisError(err)) {
        return;
      }

      if (err.type === "message") {
        toast(err.error, { type: "error" });
      }

      if (err.type === "validation") {
        let errors = err.errors;
        Object.keys(errors).forEach((errInput) => {
          errors[errInput].forEach((errMessage) => {
            toast(errMessage, { type: "error" });
          });
        });
      }
    }
  };

  return (
    <>
      <h2>Update Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("oldPassword")}
          error={errors.oldPassword?.message}
          type="password"
          disabled={isSubmiting}
          placeholder="Current Password"
        />

        <Input
          {...register("newPassword")}
          error={errors.newPassword?.message}
          type="password"
          disabled={isSubmiting}
          placeholder="New Password"
        />

        <Input
          {...register("passwordConfirmation")}
          error={errors.passwordConfirmation?.message}
          type="password"
          placeholder="Confirm Password"
          disabled={isSubmiting}
        />

        <input type={"submit"} />
      </form>
    </>
  );
};

export default UpdatePasswordForm;
