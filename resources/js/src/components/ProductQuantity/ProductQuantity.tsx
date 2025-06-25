import { useProductContext } from "@/src/contexts/MainProductContext";
import React from "react";

interface Props {
  value: any;
  onChange: (value: number) => void;
}

const ProductQuantity: React.FC<Props> = ({ value, onChange }: Props) => {
  const { state } = useProductContext();
  const disabled = state.status === "fetching";

  const handleChange = (quantity: number) => {
    const regex = /^[0-9\b]+$/;

    if (!regex.test(value)) {
      return;
    }

    console.log(value, "value");

    if (quantity >= 0) {
      onChange(quantity);
    } else {
      onChange(value);
    }
  };

  return (
    <div className="qty-input-with-btns">
      <button
        onClick={() => handleChange(value === 1 ? 1 : value - 1)}
        disabled={disabled}
      >
        <i className="icon-minus" />
      </button>

      <input
        type="text"
        value={value}
        className="qty-input"
        onChange={(e) => handleChange(+e.target.value)}
        onBlur={() => value <= 0 && handleChange(1)}
        disabled={disabled}
      />

      <button onClick={() => handleChange(value + 1)} disabled={disabled}>
        <i className="icon-plus" />
      </button>
    </div>
  );
};

export default ProductQuantity;
