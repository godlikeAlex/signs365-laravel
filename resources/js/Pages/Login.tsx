import { isCustomAxisError } from "@/src/helpers/axiosErrorGrabber";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/src/components";
import { toast } from "react-toastify";

interface Props {}

const Login: React.FC<Props> = ({}: Props) => {
  const { data, setData, errors, processing, post, reset } = useForm({
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
      <Head>
        <title>Login</title>
      </Head>

      <div className="ps-account">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-12 col-md-8">
              <form onSubmit={onSubmit}>
                <div className="ps-form--review">
                  <h2 className="ps-form__title">Login</h2>
                  <Input
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    type="email"
                    error={errors.email}
                    disabled={processing}
                    formType={"profile"}
                    label="Email"
                  />

                  <Input
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    type="password"
                    error={errors.password}
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
                  <Link className="ps-account__link" href="/forgot-password">
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
