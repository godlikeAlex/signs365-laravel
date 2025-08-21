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

interface Props {
  product: { id: number; name: string };
  onSuccess: () => void;
}

type Inputs = {
  review: string;
  rating: number;
  media: File[];
};

const MAX_FILE_SIZE = 1000 * 1000 * 5;

const reviewSchema = yup.object({
  rating: yup.number().required("Please rate the product").max(5).min(1),
  review: yup
    .string()
    .required("Please write your review")
    .min(5, "Please write your review")
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
        "Max allowed size is 5MB",
        (value) => value && value.size <= MAX_FILE_SIZE
      )
  ),
});

export default function ReviewForm({ product, onSuccess }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { media: [], review: "" },
    resolver: yupResolver(reviewSchema),
  });

  const onSubmit = async (values: Inputs) => {
    try {
      await ReviewService.createReview({ ...values, productID: product.id });

      onSuccess();
      toast("Your review will be published soon.", { type: "success" });
    } catch {
      toast("Failed to send review.", { type: "error" });
    }
  };

  return (
    <form className={classes.reviewForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.reviewFormTitle}>{product.name}</h2>

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

        {errors.review && (
          <p className={classes.reviewFormError}>{errors.review.message}</p>
        )}
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
