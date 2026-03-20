import { EstimateFileField } from "../../types";
import UploadControl from "./UploadControl";

interface Props {
  config: EstimateFileField;
}

export default function Upload({ config }: Props) {
  const fieldKey = config.dynamicKeyField || config.title;

  return <UploadControl name={fieldKey} disclaimer={config.disclaimer} />;
}
