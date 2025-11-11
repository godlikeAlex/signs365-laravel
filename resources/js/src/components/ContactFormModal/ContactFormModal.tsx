import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import * as yup from "yup";
import { yupTelephoneRule } from "../InputTelephoneMask/yupTelephoneRule";
import BaseInput from "../BaseInput";
import InputTelephoneMask from "../InputTelephoneMask/InputTelephoneMask";
import Button from "../Button";

import classes from "./ContactFormModal.module.scss";
import { toast } from "react-toastify";
import ProductService from "@/src/services/ProductService";
import { useLocation, useParams } from "react-router-dom";
import { usePage } from "@inertiajs/react";
import ContactService from "@/src/services/ContactService";

interface Props {
  isOpen: boolean;
  close: () => void;
  productSLUG: string | null;
}

type Inputs = {
  name: string;
  email: string;
  phone: string;
};

const FormSchema = yup
  .object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    phone: yupTelephoneRule({
      message: "Please enter a valid phone number",
      nullable: false,
    }),
  })
  .required();

export default function ContactFormModal({
  isOpen,
  close,
  productSLUG,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = async (inputs: Inputs) => {
    setIsSubmitting(true);

    try {
      let responseSuccess;
      if (productSLUG) {
        const { data } = await ProductService.sendRequestProduct(
          productSLUG,
          inputs
        );

        responseSuccess = data.ok;
      } else {
        const { data } = await ContactService.sendRequestContact({
          ...inputs,
          message: "",
        });

        responseSuccess = data.ok;
      }

      if (responseSuccess) {
        toast("Request sent! We’ll get back to you soon.", {
          type: "success",
          position: "bottom-center",
          theme: "colored",
          autoClose: 8500,
        });
        reset();
        close();
      } else {
        toast("Error sending request, please try again later", {
          type: "error",
          position: "bottom-center",
          theme: "colored",
        });
      }

      setIsSubmitting(false);
    } catch (error) {
      toast("Error sending request, please try again later", {
        type: "error",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      {...{ isOpen, close }}
      customClasses={{
        content: classes.content,
      }}
    >
      <div className="text-center">
        <h2>Let’s Start</h2>
      </div>
      <form
        className="ps-form--review"
        style={{ marginBottom: 0, marginTop: 25 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <BaseInput
          type="text"
          {...register("name")}
          disabled={isSubmitting}
          label="Name"
          error={Boolean(errors.name?.message)}
        />

        <BaseInput
          type="email"
          {...register("email")}
          disabled={isSubmitting}
          label="Email"
          error={Boolean(errors.email?.message)}
        />

        <InputTelephoneMask
          showMask
          separate
          component={BaseInput}
          label="Phone"
          error={Boolean(errors.phone?.message)}
          {...register("phone")}
        />

        <div className="ps-form__submit">
          <Button
            type="submit"
            style={{ width: "100%", maxWidth: "unset", marginTop: 20 }}
            disabled={isSubmitting}
          >
            Let’s start
          </Button>
        </div>
      </form>
    </Modal>
  );
}
