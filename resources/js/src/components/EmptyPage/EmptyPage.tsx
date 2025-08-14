import React from "react";

import CartIcon from "@/assets/icons/SMALL/cart.svg?react";

interface Props {
  iconClass: string;
  size: "default" | "small";
  title: string;
}

const EmptyPage: React.FC<Props> = ({
  size = "default",
  iconClass,
  title,
}: Props) => {
  return (
    <div
      className="cart-empty text-center title-with-icon-section"
      style={{ height: size === "small" ? "50vh" : "70vh", width: "100%" }}
    >
      <div className="ps-cart__icon">
        <CartIcon />
      </div>
      <h1
        className="cart-title"
        style={{ color: "#595855", marginTop: 20, fontWeight: 400 }}
      >
        {title}
      </h1>
    </div>
  );
};

export default EmptyPage;
