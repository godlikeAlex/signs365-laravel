import React, { useEffect, useState } from "react";

interface Props {}

const useProductValidation = ({}: Props) => {
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {}, []);

  return {
    canSubmit,
  };
};

export default useProductValidation;
