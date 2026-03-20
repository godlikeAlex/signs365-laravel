import { EstimateFormField } from "@/src/types/EstimateProductModel";
import { Input, RadioToggle, Textarea, Upload } from "./components";
import { DynamicEstimateField } from "./types";

interface Props {
  fieldConfig: DynamicEstimateField;
}

export default function EstimateField({ fieldConfig }: Props) {
  switch (fieldConfig.field_type) {
    case "radio":
      return <RadioToggle config={fieldConfig} />;
    case "textarea":
      return <Textarea config={fieldConfig} />;
    case "text":
      return <Input config={fieldConfig} />;
    case "file":
      return <Upload config={fieldConfig} />;
    default:
      console.warn(`Unsupported field type: ${JSON.stringify(fieldConfig)}`);
      return null;
  }
}
