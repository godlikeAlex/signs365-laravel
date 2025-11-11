import { generatePattern } from "@react-input/mask";
import * as yup from "yup";

import { INPUT_TELEPHONE_MASK } from "./InputTelephoneMask";

export const yupTelephoneRule = ({
  message,
  nullable = false,
}: {
  message: string;
  nullable: boolean;
}) => {
  return yup.string().test("Is Correct Phone", message, (value) => {
    if (nullable) return true;

    return RegExp(generatePattern("full-inexact", INPUT_TELEPHONE_MASK)).test(
      value
    );
  });
};
