import React, { useEffect, useState } from "react";
import Input from "../Input";
import { toast } from "react-toastify";
import axiosErrorGrab, {
  isCustomAxisError,
} from "@/src/helpers/axiosErrorGrabber";
import { useForm, usePage } from "@inertiajs/react";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { UserService } from "@/src/services";

interface Props {}

const UpdatePersonalInformationForm: React.FC<Props> = ({}: Props) => {
  const { auth } = usePage<SharedInertiaData>().props;
  const [preview, setPreview] = useState<string>(
    auth.user && auth.user.avatar
      ? `/storage/${auth.user.avatar}`
      : "/default-profile.png"
  );
  const { data, setData, errors, processing, post } = useForm({
    name: auth.user.name,
    email: auth.user.email,
    avatar: undefined,
    preview:
      auth.user && auth.user.avatar
        ? `/storage/${auth.user.avatar}`
        : "/default-profile.png",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    post("/api/profile/edit", {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast("User information updated", { type: "success" }),
    });
  };

  return (
    <form onSubmit={onSubmit}>
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
            src={data.preview}
            style={{ width: 120, height: 120, borderRadius: 120 }}
          />

          <input
            onChange={(e) => {
              if (e.target.files) {
                setData({
                  ...data,
                  preview: URL.createObjectURL(e.target.files[0]),
                  avatar: e.target.files[0],
                });
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
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          type="text"
          error={errors.name}
          disabled={processing}
          formType="profile"
        />

        <Input
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          type="email"
          error={errors.email}
          disabled={processing}
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
