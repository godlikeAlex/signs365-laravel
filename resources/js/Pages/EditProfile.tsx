import {
  SEOHead,
  UpdatePasswordForm,
  UpdatePersonalInformationForm,
} from "@/src/components";
import { Head, Link } from "@inertiajs/react";
import React from "react";

interface Props {}

const EditProfile: React.FC<Props> = ({}: Props) => {
  return (
    <>
      <SEOHead title="Edit Profile" />

      <div className="ps-account">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item">
              <Link href="/profile">Profile</Link>
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
    </>
  );
};

export default EditProfile;
