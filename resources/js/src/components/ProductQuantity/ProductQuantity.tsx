import React from "react";

interface Props {
  value: any;
  onChange: (value: number) => void;
}

const ProductQuantity: React.FC<Props> = ({ value, onChange }: Props) => {
  const handleChange = (quantity: number) => {
    console.log(value, "value");

    const regex = /^[0-9\b]+$/;

    if (!regex.test(value)) {
      return;
    }

    if (quantity >= 0) {
      onChange(quantity);
    } else {
      onChange(value);
    }
  };

  return (
    <div className="qty-input-with-btns">
      <button onClick={() => handleChange(value === 1 ? 1 : value - 1)}>
        <i className="icon-minus" />
      </button>

      <input
        type="text"
        value={value}
        className="qty-input"
        onChange={(e) => handleChange(+e.target.value)}
        onBlur={() => value == 0 && handleChange(1)}
      />

      <button onClick={() => handleChange(value + 1)}>
        <i className="icon-plus" />
      </button>
    </div>
  );
};

export default ProductQuantity;
