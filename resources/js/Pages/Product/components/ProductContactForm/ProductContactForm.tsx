import { BaseInput, Button, Input } from "@/src/components";
import ProductService from "@/src/services/ProductService";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import ProductFormSection from "../ProductFormSection";

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
    <ProductFormSection>
      <div className="ps-checkout">
        <div className="container">
          <div className="row">
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <div className="ps-form--review" style={{ marginBottom: 0 }}>
                <BaseInput
                  type="text"
                  {...register("name")}
                  disabled={isSubmitting}
                  label="Name"
                />
                <BaseInput
                  type="email"
                  {...register("email")}
                  disabled={isSubmitting}
                  label="Email"
                />

                <div className="ps-form__submit">
                  <Button
                    type="submit"
                    style={{ width: "100%", maxWidth: "unset", marginTop: 20 }}
                    variant="primary"
                    color="primary-600"
                    disabled={isSubmitting}
                  >
                    Let's Talk
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProductFormSection>
  );
};

export default ProductContactForm;
