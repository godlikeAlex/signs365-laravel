import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEstimateFormSchema,
  EstimateFormSchema,
} from "./schema/estimate-form-schema";
import {
  EstimateFormSection,
  EstimateQuantity,
  EstimateSubmitBar,
  SelectForm,
} from "./components";
import { SelectSize } from "./components/SelectSize";
import EstimateFormService from "./EstimateForm.service";
import { ProductEstimateForm } from "@/src/types/EstimateProductModel";
import { EstimateField } from "./components/EstimateField";
import EstimateCartService from "./EstimateCart.service";
import { router, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";

interface Props {
  forms: ProductEstimateForm[];
}

export default function EstimateForm({ forms }: Props) {
  const page = usePage<{ product: { id: number } }>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formMethods = useForm<EstimateFormSchema>({
    resolver: zodResolver(createEstimateFormSchema(forms)),
    mode: "all",
    defaultValues: {
      selectedFormIds: forms[0]?.id ? [forms[0].id] : [],
      quantity: 1,
      unit: "inches",
      width: 1,
      height: 1,
      dynamicEstimateFields: {},
    },
  });
  const selectedFormIds =
    useWatch({
      control: formMethods.control,
      name: "selectedFormIds",
    }) ?? [];
  const formFields = EstimateFormService.combineFormFields({
    forms,
    selectedFormIds,
  });

  async function onSubmit(data: EstimateFormSchema) {
    const body = EstimateFormService.buildBundleParams(
      page.props.product.id,
      data,
      forms
    );

    try {
      setIsSubmitting(true);
      await EstimateCartService.addBundle(body);

      router.reload({
        only: ["estimate_cart"],
        onSuccess: () => {
          toast("Successfully added to estimate", {
            type: "success",
            position: "bottom-center",
            theme: "colored",
            onClick: () => router.visit("/estimate/cart"),
          });
        },
      });
    } catch (error) {
      toast("Failed to add estimate", {
        type: "error",
        position: "bottom-center",
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <EstimateFormSection>
          <EstimateFormSection.Title>
            Select Your Service
          </EstimateFormSection.Title>
          <SelectForm forms={forms} />
        </EstimateFormSection>

        <EstimateFormSection>
          <EstimateFormSection.Title>Sizes</EstimateFormSection.Title>
          <SelectSize />
        </EstimateFormSection>

        {formFields.map((field) => (
          <EstimateFormSection key={`${field.form_id}-${field.id}`}>
            <EstimateFormSection.Title>{field.title}</EstimateFormSection.Title>

            <EstimateField
              fieldConfig={{
                dynamicKeyField: `${field.form_id.toString()}-${field.id.toString()}`,
                ...field,
              }}
            />
          </EstimateFormSection>
        ))}

        <EstimateFormSection>
          <EstimateFormSection.Title>Quantity</EstimateFormSection.Title>
          <EstimateQuantity />
        </EstimateFormSection>

        <EstimateSubmitBar
          productID={page.props.product.id}
          isSubmitting={isSubmitting}
          forms={forms}
        />
      </form>
    </FormProvider>
  );
}
