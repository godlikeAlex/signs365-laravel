import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import Input from "../Input";
import { toast } from "react-toastify";
import axiosErrorGrab, {
  isCustomAxisError,
} from "@/src/helpers/axiosErrorGrabber";
import { login, updateUser } from "@/src/redux/authSlice";
import { EditProfileParams } from "@/src/types/servicesParams";
import UserService from "@/src/services/UserService";

interface Props {}

const EditSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  avatar: yup.mixed().nullable(),
  preview: yup.string().nullable(),
});

const UpdatePersonalInformationForm: React.FC<Props> = ({}: Props) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<EditProfileParams>({
    resolver: yupResolver(EditSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      avatar: undefined,
      preview:
        user && user.avatar
          ? `/storage/${user.avatar}`
          : "/default-profile.png",
    },
  });

  const onSubmit: SubmitHandler<EditProfileParams> = async (data) => {
    setIsSubmiting(true);

    try {
      const { data: editedUser } = await UserService.editProfile(data);

      dispatch(updateUser(editedUser));
      setIsSubmiting(false);
      toast("Profile updated!", { type: "success" });

      reset({
        name: editedUser.name,
        email: editedUser.email,
        avatar: null,
        preview: editedUser.avatar
          ? `/storage/${editedUser.avatar}`
          : "/default-profile.png",
      });
    } catch (error) {
      setIsSubmiting(false);

      const err = axiosErrorGrab(error);

      if (!isCustomAxisError(err)) {
        return;
      }

      console.log(err);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="ps-form--review">
        <h2 className="ps-form__title">Personal Information</h2>

        <div
          className="ps-form__group"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={watch("preview")}
            style={{ width: 120, height: 120, borderRadius: 120 }}
          />

          <input
            onChange={(e) => {
              if (e.target.files) {
                console.log(URL.createObjectURL(e.target.files[0]));
                setValue("preview", URL.createObjectURL(e.target.files[0]));
                setValue("avatar", e.target.files[0]);
              }
            }}
            type="file"
            id="upload"
            hidden={true}
            style={{ display: "none" }}
          />
          <label htmlFor="upload" style={{ cursor: "pointer", marginTop: 10 }}>
            Choose file
          </label>
        </div>

        <Input
          {...register("name")}
          type="text"
          error={errors.name?.message}
          disabled={isSubmiting}
          formType="profile"
        />

        <Input
          {...register("email")}
          type="email"
          error={errors.email?.message}
          disabled={isSubmiting}
          formType="profile"
        />

        <div className="ps-form__submit">
          <button className="ps-btn ps-btn--warning">Update</button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePersonalInformationForm;
