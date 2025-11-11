import { BaseInput, Button, Input, TextArea } from "@/src/components";
import ProductService from "@/src/services/ProductService";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import ProductFormSection from "../ProductFormSection";
import { generatePattern, InputMask } from "@react-input/mask";
import { yupTelephoneRule } from "@/src/components/InputTelephoneMask/yupTelephoneRule";
import InputTelephoneMask from "@/src/components/InputTelephoneMask/InputTelephoneMask";

interface Props {
  productSlug: string;
}

const INPUT_PHONE_MASK_OPTIONS = {
  mask: "+1 (___) ___-__-__",
  replacement: { _: /\d/ },
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

type Inputs = {
  name: string;
  email: string;
  phone: string;
};

const ProductContactForm: React.FC<Props> = ({ productSlug }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
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
      const { data } = await ProductService.sendRequestProduct(
        productSlug,
        inputs
      );

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
    <ProductFormSection>
      <div className="ps-checkout">
        <div className="container">
          <div className="row">
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <div style={{ textAlign: "center" }}>
                <h3>
                  <span style={{ color: "#ffca1a" }}>Contact us</span> — we’ll
                  answer all your questions
                </h3>
              </div>

              <div
                className="ps-form--review"
                style={{ marginBottom: 0, marginTop: 25 }}
              >
                <BaseInput
                  type="text"
                  {...register("name")}
                  disabled={isSubmitting}
                  label="Name"
                  error={Boolean(errors.name?.message)}
                />

                <div className="row">
                  <div className="col-md-6">
                    <BaseInput
                      type="email"
                      {...register("email")}
                      disabled={isSubmitting}
                      label="Email"
                      error={Boolean(errors.email?.message)}
                    />
                  </div>

                  <div className="col-md-6">
                    <InputTelephoneMask
                      showMask
                      separate
                      component={BaseInput}
                      label="Phone"
                      error={Boolean(errors.phone?.message)}
                      {...register("phone")}
                    />
                  </div>
                </div>

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
