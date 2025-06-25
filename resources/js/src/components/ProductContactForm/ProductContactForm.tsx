import ProductService from "@/src/services/ProductService";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Input from "../Input";

const FormSchema = yup
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
  productSlug: string;
}

const ProductContactForm: React.FC<Props> = ({ productSlug }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = async (inputs: Inputs) => {
    setIsSubmitting(true);

    try {
      const { data } = await ProductService.sendRequestProduct(
        productSlug,
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
                  style={{ width: "100%", maxWidth: "unset" }}
                  className="ps-btn ps-btn--warning custom-button"
                  disabled={isSubmitting}
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductContactForm;
