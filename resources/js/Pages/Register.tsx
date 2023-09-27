import { Input } from "@/src/components";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "react-toastify";

interface Props {}

const Register: React.FC<Props> = ({}: Props) => {
  const { data, setData, errors, processing, post, reset } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post("/register", {
      onError: (error) => {
        toast(error.error, { type: "error" });
        reset("password");
      },
    });
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="ps-account">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-12 col-md-8">
              <form onSubmit={onSubmit}>
                <div className="ps-form--review">
                  <h2 className="ps-form__title">Create account</h2>
                  <Input
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    type="text"
                    error={errors.name}
                    disabled={processing}
                    formType={"profile"}
                    label={"Name"}
                  />

                  <Input
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    type="email"
                    error={errors.email}
                    disabled={processing}
                    formType={"profile"}
                    label={"Email"}
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
                    <button className="ps-btn ps-btn--warning">
                      Create account
                    </button>
                  </div>

                  <Link className="ps-account__link" href="/login">
                    Have an account? Login.
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

export default Register;
