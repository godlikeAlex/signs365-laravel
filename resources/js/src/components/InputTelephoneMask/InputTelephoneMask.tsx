import BaseInput from "../BaseInput";
import { generatePattern, InputMask } from "@react-input/mask";
import React, { forwardRef, PropsWithChildren } from "react";

export const INPUT_TELEPHONE_MASK = {
  mask: "+1 (___) ___-__-__",
  replacement: { _: /\d/ },
};

type Props = React.ComponentProps<typeof InputMask>;

const InputTelephoneMask = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <InputMask
      {...INPUT_TELEPHONE_MASK}
      {...props}
      component={BaseInput}
      ref={ref}
    />
  );
});

export default InputTelephoneMask;
