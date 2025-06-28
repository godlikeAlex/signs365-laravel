import React from "react";

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
        <i
          className={iconClass}
          style={{ color: "#595855", fontSize: 120 }}
        ></i>
      </div>
      <h1 className="cart-title" style={{ color: "#103178", marginTop: 20 }}>
        {title}
      </h1>
    </div>
  );
};

export default EmptyPage;
