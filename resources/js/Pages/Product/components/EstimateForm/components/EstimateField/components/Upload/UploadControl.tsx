import { FileUpload } from "@/src/components";
import { useController, useFormContext } from "react-hook-form";
import { EstimateFormSchema } from "../../../../schema/estimate-form-schema";
import { EstimateFieldDisclaimer } from "../EstimateFieldDisclaimer";
import { EstimateFieldError } from "../EstimateFieldError";

type Props = {
  name: string;
  disclaimer?: string;
};

export default function UploadControl({ name, disclaimer }: Props) {
  const { control } = useFormContext<EstimateFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({
    shouldUnregister: true,
    control,
    name: `dynamicEstimateFields.${name}`,
  });

  const files = (Array.isArray(field.value) ? field.value : []) as File[];

  return (
    <>
      <FileUpload
        files={files}
        onUpload={(nextFiles) => field.onChange([...files, ...nextFiles])}
        onUpdate={(nextFiles) => field.onChange(nextFiles)}
      />

      {disclaimer ? <EstimateFieldDisclaimer text={disclaimer} /> : null}

      {error ? <EstimateFieldError error={error.message} /> : null}
    </>
  );
}
