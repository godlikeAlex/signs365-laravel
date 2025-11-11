import { isCustomAxisError } from "@/src/helpers/axiosErrorGrabber";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Input, SEOHead, SocialiteButton } from "@/src/components";
import { toast } from "react-toastify";
import { SharedInertiaData } from "@/src/types/inertiaTypes";

interface Props {}

const Login: React.FC<Props> = ({}: Props) => {
  const { errors } = usePage<SharedInertiaData>().props;

  const {
    data,
    setData,
    errors: formErrors,
    processing,
    post,
    reset,
  } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    post("/login", {
      onError: (error) => {
        toast(error.error, { type: "error" });
        reset("password");
      },
    });
  };

  return (
    <>
      <SEOHead title="Login" />

      <div className="ps-account" style={{ marginTop: 80 }}>
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-12 col-md-8">
              <div>
                <h2 className="ps-form__title">Welcome to Signs7</h2>
                {errors.authRoot && (
                  <p style={{ color: "red" }}>{errors.authRoot}</p>
                )}
                <SocialiteButton
                  provider="google"
                  onClick={() =>
                    (window.location.href = "/auth/google/redirect")
                  }
                />
              </div>

              <form onSubmit={onSubmit}>
                <div className="ps-form--review" style={{ marginTop: 30 }}>
                  <h4 style={{ marginBottom: 30 }}>Or, sign in with email.</h4>

                  <Input
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    type="email"
                    error={formErrors.email}
                    disabled={processing}
                    formType={"profile"}
                    label="Email"
                  />

                  <Input
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    type="password"
                    error={formErrors.password}
                    disabled={processing}
                    formType={"profile"}
                    label={"Password"}
                  />

                  <div className="ps-form__submit">
                    <button
                      className="ps-btn ps-btn--warning"
                      disabled={processing}
                    >
                      Log in
                    </button>
                    <div className="form-check">
                      <Link className="ps-account__link" href="/register">
                        Create account
                      </Link>
                    </div>
                  </div>
                  <Link className="ps-account__link" href="/forgot">
                    Lost your password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
