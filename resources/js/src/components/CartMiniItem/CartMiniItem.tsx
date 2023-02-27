import React from "react";

interface CartMiniItemProps {}

const CartMiniItem: React.FC<CartMiniItemProps> = ({}: CartMiniItemProps) => {
  return (
    <div className="ps-product--mini-cart">
      <a
        className="ps-product__thumbnail"
        href="https://nouthemes.net/html/mymedi/product-default.html"
      >
        <img src="img/products/055.jpg" alt="alt" />
      </a>
      <div className="ps-product__content">
        <a
          className="ps-product__name"
          href="https://nouthemes.net/html/mymedi/product-default.html"
        >
          Somersung Sonic X2500 Pro White
        </a>
        <p className="ps-product__meta">
          {" "}
          <span className="ps-product__price">$399.99</span>
        </p>
      </div>
      <a className="ps-product__remove" href="javascript: void(0)">
        <i className="icon-cross"></i>
      </a>
    </div>
  );
};

export default CartMiniItem;
