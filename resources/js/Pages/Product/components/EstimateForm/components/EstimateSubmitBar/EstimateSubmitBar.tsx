import React from "react";
import { useWatch, useFormContext } from "react-hook-form";
import EstimateFormService from "../../EstimateForm.service";
import EstimateCartService from "../../EstimateCart.service";
import { EstimateFormSchema } from "../../schema/estimate-form-schema";
import classes from "./EstimateSubmitBar.module.scss";
import { Button } from "@/src/components";
import { ProductEstimateForm } from "@/src/types/EstimateProductModel";

interface Props {
  productID: number;
  isSubmitting: boolean;
  forms: ProductEstimateForm[];
}

export default function EstimateSubmitBar({
  productID,
  isSubmitting,
  forms,
}: Props) {
  const [estimatePrice, setEstimatePrice] = React.useState<string | null>(null);
  const [isCalculating, setIsCalculating] = React.useState(false);
  const requestIDRef = React.useRef(0);
  const calculateAbortRef = React.useRef<AbortController | null>(null);
  const { control } = useFormContext<EstimateFormSchema>();

  const selectedFormIds = useWatch({
    control,
    name: "selectedFormIds",
  });
  const width = useWatch({
    control,
    name: "width",
  });
  const quantity = useWatch({
    control,
    name: "quantity",
  });
  const height = useWatch({
    control,
    name: "height",
  });
  const unit = useWatch({
    control,
    name: "unit",
  });
  const dynamicEstimateFields =
    useWatch({
      control,
      name: "dynamicEstimateFields",
    }) ?? {};

  const calculateInputKey = React.useMemo(
    () =>
      JSON.stringify({
        selectedFormIds,
        quantity: quantity ?? 1,
        width,
        height,
        unit,
        dynamicEstimateFields,
      }),
    [selectedFormIds, quantity, width, height, unit, dynamicEstimateFields]
  );

  React.useEffect(() => {
    if (!selectedFormIds?.length) {
      setEstimatePrice(null);
      setIsCalculating(false);
      return;
    }

    const timeoutID = window.setTimeout(async () => {
      const currentRequestID = requestIDRef.current + 1;
      requestIDRef.current = currentRequestID;

      calculateAbortRef.current?.abort();
      const controller = new AbortController();
      calculateAbortRef.current = controller;

      const body = EstimateFormService.buildBundleParams(
        productID,
        {
          selectedFormIds,
          quantity: quantity ?? 1,
          width,
          height,
          unit,
          dynamicEstimateFields,
        },
        forms
      );

      try {
        setIsCalculating(true);
        const { data } = await EstimateCartService.calculateBundle(
          body,
          controller.signal
        );

        if (requestIDRef.current !== currentRequestID) {
          return;
        }

        setEstimatePrice(data.price);
      } catch (error: any) {
        if (error?.code === "ERR_CANCELED") {
          return;
        }
      } finally {
        if (requestIDRef.current === currentRequestID) {
          setIsCalculating(false);
        }
      }
    }, 350);

    return () => {
      window.clearTimeout(timeoutID);
    };
  }, [productID, calculateInputKey]);

  return (
    <>
      <div className={classes.container}>
        <div>
          <h4 className={classes.price}>
            Estimated: {estimatePrice ? `$${estimatePrice}` : "—"}
          </h4>
          <p className={classes.status}>
            {isCalculating || isSubmitting
              ? "Calculating, please wait..."
              : "Ready"}
          </p>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        color="black"
        className="mt-2 w-100"
      >
        {isCalculating || isSubmitting
          ? "Calculating, please wait..."
          : " Add to Projects"}
      </Button>
    </>
  );
}
