import { generatePattern } from "@react-input/mask";
import { z } from "zod";

import { INPUT_TELEPHONE_MASK } from "./InputTelephoneMask";

export const zodTelephoneRule = ({
  message,
  nullable = false,
}: {
  message: string;
  nullable?: boolean;
}) => {
  return z.string().refine((value) => {
    if (nullable && (!value || value.trim() === "")) {
      return true;
    }

    return RegExp(generatePattern("full-inexact", INPUT_TELEPHONE_MASK)).test(
      value
    );
  }, message);
};
