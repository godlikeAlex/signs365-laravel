import React from "react";
import {
  UpdatePersonalInformationForm,
  UpdatePasswordForm,
} from "@/src/components";
import { Link } from "react-router-dom";

interface EditProfileProps {}

const EditProfile: React.FC<EditProfileProps> = ({}: EditProfileProps) => {
  return (
    <div className="ps-account">
      <div className="container">
        <ul className="ps-breadcrumb">
          <li className="ps-breadcrumb__item">
            <Link to="/">Home</Link>
          </li>
          <li className="ps-breadcrumb__item">
            <Link to="/profile">Profile</Link>
          </li>

          <li className="ps-breadcrumb__item active" aria-current="page">
            Edit Profile
          </li>
        </ul>
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-12 col-md-8">
            <UpdatePersonalInformationForm />
            <UpdatePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
