import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <Input
        {...register("name")}
        type="text"
        error={errors.name?.message}
        disabled={isSubmitting}
      />
      <Input
        {...register("email")}
        type="email"
        error={errors.email?.message}
        disabled={isSubmitting}
      />
      <Input
        {...register("password")}
        type="password"
        error={errors.password?.message}
        disabled={isSubmitting}
      />
      <input type="submit" disabled={isSubmitting || !isValid} />
    </form>
  );
}
