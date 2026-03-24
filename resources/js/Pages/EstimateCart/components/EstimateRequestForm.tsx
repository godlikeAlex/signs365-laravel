import BaseInput from "@/src/components/BaseInput";
import Button from "@/src/components/Button";
import GooglePlacesInput from "@/src/components/GooglePlacesInput";
import InputTelephoneMask from "@/src/components/InputTelephoneMask/InputTelephoneMask";
import { zodTelephoneRule } from "@/src/components/InputTelephoneMask/zodTelephoneRule";
import EstimateCartService from "@/Pages/Product/components/EstimateForm/EstimateCart.service";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import classes from "../EstimateCart.module.scss";

const estimateRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  number: zodTelephoneRule({
    message: "Please enter a valid phone number",
    nullable: false,
  }),
  email: z.string().trim().email("Please enter a valid email"),
  address: z
    .any()
    .refine((value) => Boolean(value?.label), "Address is required"),
});

type EstimateRequestFormValues = z.infer<typeof estimateRequestSchema>;

interface Props {
  onSubmitSuccess: () => void;
}

export default function EstimateRequestForm({ onSubmitSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<EstimateRequestFormValues>({
    resolver: zodResolver(estimateRequestSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      number: "",
      email: "",
      address: null,
    },
  });

  const onSubmit = async (values: EstimateRequestFormValues) => {
    try {
      setIsSubmitting(true);

      await EstimateCartService.submit({
        name: values.name,
        email: values.email,
        phone: values.number,
        address: values.address?.label ?? "",
      });

      onSubmitSuccess();
    } catch (error) {
      toast("Failed to submit estimate. Please try again.", {
        type: "error",
        position: "bottom-center",
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.requestForm}>
      <BaseInput
        type="text"
        label="Name"
        placeholder="Your name"
        error={Boolean(errors.name?.message)}
        disabled={isSubmitting}
        {...register("name")}
      />

      <InputTelephoneMask
        showMask
        separate
        component={BaseInput}
        label="Number"
        placeholder="+1 (___) ___-____"
        error={Boolean(errors.number?.message)}
        disabled={isSubmitting}
        {...register("number")}
      />

      <BaseInput
        type="email"
        label="Email"
        placeholder="you@email.com"
        error={Boolean(errors.email?.message)}
        disabled={isSubmitting}
        {...register("email")}
      />

      <div className={classes.addressGroup}>
        <label className={classes.addressLabel}>Address</label>

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <GooglePlacesInput onChange={onChange} value={value} />
          )}
        />

        {errors.address?.message ? (
          <p className={classes.fieldError}>
            {errors.address.message.toString()}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        variant="primary"
        color="primary-600"
        className={classes.submitButton}
        disabled={!isValid || isSubmitting}
      >
        Submit Estimate
      </Button>
    </form>
  );
}
