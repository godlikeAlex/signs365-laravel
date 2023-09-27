import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import { ResetPasswordParams } from "@/src/types/servicesParams";
import UserService from "@/src/services/UserService";
import axiosErrorGrab, {
  isCustomAxisError,
} from "@/src/helpers/axiosErrorGrabber";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "@inertiajs/react";

interface Props {}

const UpdatePasswordForm: React.FC<Props> = ({}: Props) => {
  const { data, setData, errors, processing, post, reset } = useForm({
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post("/api/profile/password/edit", {
      preserveScroll: false,
      preserveState: false,
      onSuccess: () => {
        toast("Password updated!", { type: "success" });
      },
      onError: (error) => {
        toast(error.error, { type: "error" });
        reset("newPassword", "oldPassword", "passwordConfirmation");
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="ps-form--review">
        <h2 className="ps-form__title">Update Password</h2>
        <Input
          value={data.oldPassword}
          onChange={(e) => setData("oldPassword", e.target.value)}
          error={errors.oldPassword}
          type="password"
          disabled={processing}
          placeholder="Current Password"
          formType="profile"
        />

        <Input
          value={data.newPassword}
          onChange={(e) => setData("newPassword", e.target.value)}
          error={errors.newPassword}
          type="password"
          disabled={processing}
          placeholder="New Password"
          formType="profile"
        />

        <Input
          value={data.passwordConfirmation}
          onChange={(e) => setData("passwordConfirmation", e.target.value)}
          error={errors.passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          disabled={processing}
          formType="profile"
        />

        <div className="ps-form__submit">
          <button className="ps-btn ps-btn--warning" disabled={processing}>
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
