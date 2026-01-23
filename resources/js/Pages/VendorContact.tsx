import { BaseInput, Select, SEOHead } from "@/src/components";
import baseInputClasses from "@/src/components/BaseInput/BaseInput.module.scss";
import InputTelephoneMask from "@/src/components/InputTelephoneMask/InputTelephoneMask";
import { yupTelephoneRule } from "@/src/components/InputTelephoneMask/yupTelephoneRule";
import ContactService from "@/src/services/ContactService";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "@inertiajs/react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import type { MultiValue, SingleValue } from "react-select";

interface Props {
  title: string;
}

const FormSchema = yup
  .object({
    fullName: yup.string().min(2, "Full name is too short").required(),
    email: yup.string().email("Enter a valid email").required(),
    phone: yupTelephoneRule({
      message: "Please enter a valid phone number",
      nullable: false,
    }),
    state: yup.string().required("Select State"),
    workType: yup
      .array()
      .of(yup.string().required())
      .min(1, "Select at least one work type")
      .required(),
    otherWorkType: yup.string().optional(),
  })
  .required();

type Inputs = {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  workType: string[];
  otherWorkType?: string;
};

type WorkTypeOption = {
  value: string;
  label: string;
};

type RegionOption = {
  value: string;
  label: string;
};

const WORK_TYPE_OPTIONS: WorkTypeOption[] = [
  { value: "vinyl-installation", label: "Vinyl Installation" },
  { value: "sign-installation", label: "Sign Installation" },
  { value: "dimensional-letters", label: "Dimensional Letters" },
  { value: "banners", label: "Banners" },
  { value: "window-graphics", label: "Window Graphics" },
  { value: "wall-graphics", label: "Wall Graphics" },
  { value: "electrical-signage", label: "Electrical Signage" },
  { value: "other", label: "Other" },
];

const REGION_OPTIONS: RegionOption[] = [
  { value: "alabama", label: "Alabama" },
  { value: "alaska", label: "Alaska" },
  { value: "alberta", label: "Alberta" },
  { value: "arizona", label: "Arizona" },
  { value: "arkansas", label: "Arkansas" },
  { value: "british-columbia", label: "British Columbia" },
  { value: "california", label: "California" },
  { value: "colorado", label: "Colorado" },
  { value: "connecticut", label: "Connecticut" },
  { value: "delaware", label: "Delaware" },
  { value: "district-of-columbia", label: "District of Columbia" },
  { value: "florida", label: "Florida" },
  { value: "georgia", label: "Georgia" },
  { value: "hawaii", label: "Hawaii" },
  { value: "idaho", label: "Idaho" },
  { value: "illinois", label: "Illinois" },
  { value: "indiana", label: "Indiana" },
  { value: "iowa", label: "Iowa" },
  { value: "kansas", label: "Kansas" },
  { value: "kentucky", label: "Kentucky" },
  { value: "louisiana", label: "Louisiana" },
  { value: "maine", label: "Maine" },
  { value: "manitoba", label: "Manitoba" },
  { value: "maryland", label: "Maryland" },
  { value: "massachusetts", label: "Massachusetts" },
  { value: "michigan", label: "Michigan" },
  { value: "minnesota", label: "Minnesota" },
  { value: "mississippi", label: "Mississippi" },
  { value: "missouri", label: "Missouri" },
  { value: "montana", label: "Montana" },
  { value: "nebraska", label: "Nebraska" },
  { value: "nevada", label: "Nevada" },
  { value: "new-brunswick", label: "New Brunswick" },
  { value: "new-hampshire", label: "New Hampshire" },
  { value: "new-jersey", label: "New Jersey" },
  { value: "new-mexico", label: "New Mexico" },
  { value: "new-york", label: "New York" },
  { value: "newfoundland-and-labrador", label: "Newfoundland and Labrador" },
  { value: "north-carolina", label: "North Carolina" },
  { value: "north-dakota", label: "North Dakota" },
  { value: "northwest-territories", label: "Northwest Territories" },
  { value: "nova-scotia", label: "Nova Scotia" },
  { value: "nunavut", label: "Nunavut" },
  { value: "ohio", label: "Ohio" },
  { value: "oklahoma", label: "Oklahoma" },
  { value: "ontario", label: "Ontario" },
  { value: "oregon", label: "Oregon" },
  { value: "pennsylvania", label: "Pennsylvania" },
  { value: "prince-edward-island", label: "Prince Edward Island" },
  { value: "quebec", label: "Quebec" },
  { value: "rhode-island", label: "Rhode Island" },
  { value: "saskatchewan", label: "Saskatchewan" },
  { value: "south-carolina", label: "South Carolina" },
  { value: "south-dakota", label: "South Dakota" },
  { value: "tennessee", label: "Tennessee" },
  { value: "texas", label: "Texas" },
  { value: "utah", label: "Utah" },
  { value: "vermont", label: "Vermont" },
  { value: "virginia", label: "Virginia" },
  { value: "washington", label: "Washington" },
  { value: "west-virginia", label: "West Virginia" },
  { value: "wisconsin", label: "Wisconsin" },
  { value: "wyoming", label: "Wyoming" },
  { value: "yukon", label: "Yukon" },
];

const VendorContact: React.FC<Props> = ({ title }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(FormSchema),
  });

  const selectedWorkType = watch("workType");

  const handleWorkTypeChange = (options: MultiValue<WorkTypeOption> | null) =>
    options ? options.map((option) => option.value) : [];

  const handleRegionChange = (option: SingleValue<RegionOption>) =>
    option ? option.value : "";

  const getWorkTypeLabels = (values: string[]) =>
    WORK_TYPE_OPTIONS.filter((option) => values.includes(option.value)).map(
      (option) => option.label
    );

  const getRegionLabel = (value: string) =>
    REGION_OPTIONS.find((option) => option.value === value)?.label ?? value;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { data: response } = await ContactService.sendVendorContact({
        ...data,
        state: getRegionLabel(data.state),
        workType: getWorkTypeLabels(data.workType),
      });

      if (response.ok) {
        toast("Your request has been sent.", {
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
    } catch (error) {
      toast("Error sending request, please try again later", {
        type: "error",
        position: "bottom-center",
        theme: "colored",
      });
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
              Vendor Cooperation
            </li>
          </ul>

          <div className="ps-contact__content">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="ps-contact__info">
                  <h2 className="ps-contact__title">Let&apos;s Collaborate</h2>
                  <p className="ps-contact__text">
                    Interested in partnering with us? Share your contact
                    details and the services you provide, and our team will
                    reach out shortly to discuss next steps.
                  </p>
                </div>
              </div>

              <div className="col-md-12 mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="ps-form--review">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <BaseInput
                          type="text"
                          placeholder="Full name"
                          {...register("fullName")}
                          disabled={isSubmitting}
                          label="Full name"
                          error={Boolean(errors.fullName?.message)}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <BaseInput
                          type="email"
                          placeholder="Email address"
                          {...register("email")}
                          disabled={isSubmitting}
                          label="Email address"
                          error={Boolean(errors.email?.message)}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <InputTelephoneMask
                          showMask
                          separate
                          component={BaseInput}
                          label="Phone number"
                          placeholder="Phone number"
                          {...register("phone")}
                          error={Boolean(errors.phone?.message)}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className={baseInputClasses.baseInputWrapper}>
                          State / Province
                          <Controller
                            control={control}
                            name="state"
                            render={({ field }) => (
                              <Select
                                size="md"
                                options={REGION_OPTIONS}
                                placeholder="Select state or province"
                                isDisabled={isSubmitting}
                                isSearchable
                                error={Boolean(errors.state?.message)}
                                value={
                                  REGION_OPTIONS.find(
                                    (option) => option.value === field.value
                                  ) || null
                                }
                                onChange={(option) =>
                                  field.onChange(
                                    handleRegionChange(
                                      option as SingleValue<RegionOption>
                                    )
                                  )
                                }
                              />
                            )}
                          />
                        </label>
                      </div>
                      <div className="col-12">
                        <label className={baseInputClasses.baseInputWrapper}>
                          Type of work
                          <Controller
                            control={control}
                            name="workType"
                            render={({ field }) => (
                              <Select
                                size="md"
                                options={WORK_TYPE_OPTIONS}
                                placeholder="Select type of work"
                                isDisabled={isSubmitting}
                                isSearchable={false}
                                isMulti
                                error={Boolean(errors.workType?.message)}
                                value={WORK_TYPE_OPTIONS.filter((option) =>
                                  Array.isArray(field.value)
                                    ? field.value.includes(option.value)
                                    : false
                                )}
                                onChange={(options) =>
                                  field.onChange(
                                    handleWorkTypeChange(
                                      options as MultiValue<WorkTypeOption> | null
                                    )
                                  )
                                }
                              />
                            )}
                          />
                        </label>
                      </div>
                      {selectedWorkType?.includes("other") ? (
                        <div className="col-12">
                          <BaseInput
                            type="text"
                            placeholder="Tell us about the work"
                            {...register("otherWorkType")}
                            disabled={isSubmitting}
                            label="Other work type (optional)"
                            error={Boolean(errors.otherWorkType?.message)}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="ps-form__submit mt-3 text-center">
                      <button
                        className="ps-btn ps-btn--warning"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Send request
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorContact;
