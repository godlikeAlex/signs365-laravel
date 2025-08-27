import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

import classNames from "classnames";
import * as yup from "yup";

import Button from "../Button";
import RatingInput from "./RatingInput";
import classes from "./ReviewForm.module.scss";
import TextArea from "../TextArea";
import FileUpload from "../FileUpload";
import ReviewService from "@/src/services/ReviewService";
import { User } from "@/src/types/models";
import BaseInput from "../BaseInput";

interface Props {
  product: { id: number; name: string };
  onSuccess: () => void;
  user?: User | null;
}

type Inputs = {
  name: string;
  email: string;
  review: string;
  rating: number;
  media: File[];
};

const MAX_FILE_SIZE = 1000 * 1000 * 10;

const reviewSchema = yup.object({
  name: yup.string().required("Please enter your name"),
  email: yup.string().email().required("Please enter your email"),
  rating: yup.number().required("Please rate the product").max(5).min(1),
  review: yup
    .string()
    .required("Please write your review")
    .min(5, "Please write a little more detail")
    .max(
      1200,
      ({ max }) => `The maximum number of characters allowed is ${max}`
    ),
  media: yup.array().of(
    yup
      .mixed()
      .required()
      .test(
        "is-valid-size",
        "Max allowed size is 10MB",
        (value) => value && value.size <= MAX_FILE_SIZE
      )
  ),
});

export default function ReviewForm({ product, user, onSuccess }: Props) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      media: [],
      review: "",
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(reviewSchema),
  });

  const onSubmit = async (values: Inputs) => {
    try {
      await ReviewService.createReview({ ...values, productID: product.id });

      onSuccess();
      toast("Your review will be published soon.", {
        type: "success",
        position: "bottom-center",
        theme: "colored",
      });
    } catch {
      toast("Failed to send review.", { type: "error" });
    }
  };

  return (
    <form className={classes.reviewForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.reviewFormTitle}>{product.name}</h2>

      {!user && (
        <div className="row">
          <div className={classNames("col-md-6", classes.reviewFormGroup)}>
            <BaseInput
              label="Name"
              placeholder="Your Name"
              {...register("name")}
            />

            <p className={classes.reviewFormError}>{errors.name?.message}</p>
          </div>

          <div className={classNames("col-md-6", classes.reviewFormGroup)}>
            <BaseInput
              label="Email"
              placeholder="Your Email"
              {...register("email")}
            />

            <p className={classes.reviewFormError}>{errors.email?.message}</p>
          </div>
        </div>
      )}

      <div
        className={classNames(
          "text-center",
          classes.reviewFormGroup,
          classes.reviewFormSection
        )}
      >
        <Controller
          render={({ field }) => (
            <RatingInput
              value={field.value}
              onChange={(selectedRating) => field.onChange(selectedRating)}
              disabled={isSubmitting}
            />
          )}
          control={control}
          name="rating"
        />

        {errors.rating && (
          <p className={classes.reviewFormError}>{errors.rating.message}</p>
        )}
      </div>

      <div className={classNames(classes.reviewFormGroup)}>
        <Controller
          render={({ field }) => (
            <FileUpload
              files={field.value}
              onUpload={(files) => field.onChange([...field.value, ...files])}
              onUpdate={(files) => field.onChange(files)}
            />
          )}
          control={control}
          name="media"
        />

        {errors.media && (
          <p className={classes.reviewFormError}>
            {errors?.media[0]?.message || "Max Allowed size is 5MB"}
          </p>
        )}
      </div>

      <div className={classNames(classes.reviewFormGroup)}>
        <Controller
          render={({ field }) => (
            <TextArea
              label={"How do you like the product?"}
              placeholder="Write your review here"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={isSubmitting}
            />
          )}
          control={control}
          name="review"
        />

        <p className={classes.reviewFormError}>{errors.review?.message}</p>
      </div>

      <div className={classNames("text-center", classes.reviewFormGroup)}>
        <Button
          disabled={isSubmitting}
          className="w-100"
          variant="primary"
          color="primary-600"
        >
          Submit Review
        </Button>
      </div>
    </form>
  );
}
