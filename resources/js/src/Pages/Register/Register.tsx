import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { Input } from "@/src/components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "@/src/redux/authSlice";
import { toast } from "react-toastify";
import { isCustomAxisError } from "@/src/helpers/axiosErrorGrabber";
import { BASE_FOR_AUTHED_REDIRECT } from "@/src/components/ProtectedRoute/ProtectedRoute";

const RegisterSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(7).required(),
  })
  .required();

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { isAuthed, authChecked } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(RegisterSchema),
  });

  useEffect(() => {
    if (authChecked && isAuthed === true) {
      navigate(BASE_FOR_AUTHED_REDIRECT);
    }
  }, [isAuthed, authChecked]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);

    try {
      const loginData = await dispatch(registerUser(data)).unwrap();
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);

      if (!isCustomAxisError(error)) {
        return;
      }

      if (error.type === "message") {
        toast(error.error, { type: "error" });
      }

      if (error.type === "validation") {
        let errors = error.errors;
        Object.keys(errors).forEach((errInput) => {
          errors[errInput].forEach((errMessage) => {
            toast(errMessage, { type: "error" });
          });
        });
        // error.errors[0]
      }
    }
  };

  return (
    <div className="ps-account">
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-12 col-md-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ps-form--review">
                <h2 className="ps-form__title">Create account</h2>
                <Input
                  {...register("name")}
                  type="text"
                  error={errors.name?.message}
                  disabled={isSubmitting}
                  formType={"profile"}
                  label={"Name"}
                />

                <Input
                  {...register("email")}
                  type="email"
                  error={errors.email?.message}
                  disabled={isSubmitting}
                  formType={"profile"}
                  label={"Email"}
                />

                <Input
                  {...register("password")}
                  type="password"
                  error={errors.password?.message}
                  disabled={isSubmitting}
                  formType={"profile"}
                  label={"Password"}
                />

                <div className="ps-form__submit">
                  <button className="ps-btn ps-btn--warning">
                    Create account
                  </button>
                </div>
                <Link className="ps-account__link" to="/login">
                  Have an account? Login.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
