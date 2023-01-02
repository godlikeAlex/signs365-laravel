import React from "react";
import { UpdatePersonalInformationForm } from "@/src/components";
import UpdatePasswordForm from "@/src/components/UpdatePasswordForm";

interface EditProfileProps {}

const EditProfile: React.FC<EditProfileProps> = ({}: EditProfileProps) => {
  return (
    <>
      <UpdatePersonalInformationForm />

      <UpdatePasswordForm />
    </>
  );
};

export default EditProfile;
