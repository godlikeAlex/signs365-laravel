import { Input, SEOHead } from "@/src/components";
import ContactService from "@/src/services/ContactService";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "@inertiajs/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

interface Props {
  title: string;
}

const FormSchema = yup
  .object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    message: yup.string().required(),
  })
  .required();

type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Contacts: React.FC<Props> = ({ title }: Props) => {
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
      const { data } = await ContactService.sendRequestContact(inputs);

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
    <>
      <SEOHead title={title} />
      <div className="ps-contact">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item active" aria-current="page">
              Contacts
            </li>
          </ul>

          <div className="ps-contact__content">
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="ps-contact__info">
                  <h2 className="ps-contact__title">How can we help you?</h2>
                  <p className="ps-contact__text">
                    We are at your disposal 7 days a week!
                  </p>
                  <h3 className="ps-contact__fax">SIGNS7</h3>
                  <div className="ps-contact__work">
                    Monday – Friday: 9:00-20:00
                    <br />
                    Saturday: 11:00 – 15:00
                  </div>
                  <div className="ps-contact__email">
                    <a href="mailto:info@signs7.com">info@signs7.com</a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className="ps-contact__map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.108155460138!2d-106.33165248842836!3d42.84944940392295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8760bca480ca44a5%3A0xb0d3fe005f55de69!2s312%20W%202nd%20St%20%232500%2C%20Casper%2C%20WY%2082601%2C%20USA!5e0!3m2!1sen!2sru!4v1723147020866!5m2!1sen!2sru"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <form
            action="do_action"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="ps-form--contact">
              <h2 className="ps-form__title">
                Fill up the form if you have any question
              </h2>
              <div className="row">
                <div className="col-12 col-md-4">
                  <Input
                    type="text"
                    placeholder="Your name"
                    {...register("name")}
                    error={errors.name?.message}
                    disabled={isSubmitting}
                    formType={"profile"}
                    label="Name"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Input
                    type="text"
                    placeholder="Your Email"
                    {...register("email")}
                    error={errors.name?.message}
                    disabled={isSubmitting}
                    formType={"profile"}
                    label="Email"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Input
                    type="text"
                    placeholder="Your Phone"
                    {...register("phone")}
                    error={errors.name?.message}
                    disabled={isSubmitting}
                    formType={"profile"}
                    label="Phone"
                  />
                </div>
                <div className="col-12">
                  <div className="ps-form__group">
                    <textarea
                      {...register("message")}
                      className="form-control ps-form__textarea"
                      rows={5}
                      placeholder="Message"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="ps-form__submit">
                <button className="ps-btn ps-btn--warning">Send message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contacts;
