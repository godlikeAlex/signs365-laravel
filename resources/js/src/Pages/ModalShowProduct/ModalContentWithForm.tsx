import { Input } from "@/src/components";
import ProductService from "@/src/services/ProductService";
import { IProduct } from "@/src/types/ProductModel";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import * as yup from "yup";

const LoginSchema = yup
  .object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
  })
  .required();

type Inputs = {
  name: string;
  email: string;
};

interface Props {
  product: IProduct;
  loading: boolean;
}

const ModalContentWithForm: React.FC<Props> = ({ product, loading }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (inputs: Inputs) => {
    setIsSubmitting(true);

    try {
      const { data } = await ProductService.sendRequestProduct(
        product.slug,
        inputs
      );

      if (data.ok) {
        toast("Your request has been sent!", { type: "success" });
      } else {
        toast("Error sending request, please try again later", {
          type: "error",
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

  if (loading) {
    return <Skeleton height={250} />;
  }

  return (
    <div className="ps-checkout">
      <div className="container">
        <div className="row">
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="ps-form--review" style={{ marginBottom: 0 }}>
              <Input
                type="text"
                {...register("name")}
                error={errors.name?.message}
                disabled={isSubmitting}
                formType={"checkout"}
                label="Name"
              />

              <Input
                type="email"
                {...register("email")}
                error={errors.email?.message}
                disabled={isSubmitting}
                formType={"checkout"}
                label="Email"
              />
              <div className="ps-form__submit">
                <button
                  type="submit"
                  style={{ width: "100%" }}
                  className="ps-btn ps-btn--warning custom-button"
                  disabled={isSubmitting}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalContentWithForm;
