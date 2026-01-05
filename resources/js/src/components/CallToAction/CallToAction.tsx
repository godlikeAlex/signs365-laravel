import { toast } from "react-toastify";
import BaseInput from "../BaseInput";
import Button from "../Button";
import { HomePageSection } from "../HomePageSection";
import * as yup from "yup";
import { yupTelephoneRule } from "@/src/components/InputTelephoneMask/yupTelephoneRule";

import styles from "./CallToAction.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTelephoneMask from "../InputTelephoneMask/InputTelephoneMask";
import ContactService from "@/src/services/ContactService";

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

type Inputs = {
  name: string;
  email: string;
  phone: string;
};

export default function CallToAction() {
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

    console.log(inputs);

    // return;

    try {
      const { data } = await ContactService.sendRequestContact({
        ...inputs,
        message: "",
      });

      if (data.ok) {
        toast("Request sent! We’ll get back to you soon.", {
          type: "success",
          position: "bottom-center",
          theme: "colored",
          autoClose: 8500,
        });
        reset();
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
    <div className={styles.actionContainer}>
      <HomePageSection.Title
        title="Manage your sign installations in one place"
        description="Send us a message, and we’ll contact you to make sign installation
          easy."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.rowForm}>
          <BaseInput
            placeholder="Name"
            {...register("name")}
            disabled={isSubmitting}
            wrapperClass={styles.wrapperInput}
            className={styles.input}
            error={Boolean(errors.name?.message)}
          />

          <BaseInput
            type="email"
            placeholder="Email"
            {...register("email")}
            disabled={isSubmitting}
            wrapperClass={styles.wrapperInput}
            className={styles.input}
            error={Boolean(errors.email?.message)}
          />

          <InputTelephoneMask
            showMask
            separate
            component={BaseInput}
            error={Boolean(errors.phone?.message)}
            {...register("phone")}
            wrapperClass={styles.wrapperInput}
            className={styles.input}
            disabled={isSubmitting}
          />

          <Button disabled={isSubmitting}>Send Request</Button>
        </div>
      </form>
    </div>
  );
}
