import VoucherInput from "@/src/components/VoucherInput";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { usePage } from "@inertiajs/react";
import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  submitting: boolean;
  setSubmitting: (submitting: boolean) => void;
}

const CheckoutSidebar: React.FC<Props> = ({
  submitting,
  setSubmitting,
}: Props) => {
  const { cart } = usePage<SharedInertiaData>().props;

  return (
    <div
      className="ps-checkout__order"
      style={{ position: "sticky", top: "100px" }}
    >
      <h3 className="ps-checkout__heading">Your order</h3>
      <div className="ps-checkout__row">
        <div className="ps-title">Product</div>
        <div className="ps-title">Subtotal</div>
      </div>
      {cart?.items && cart.items.length ? (
        cart.items.map((cartItem) => (
          <div className="ps-checkout__row ps-product" key={cartItem.id}>
            <div className="ps-product__name">
              {cartItem.name} x <span>{cartItem.quantity}</span>
            </div>
            <div className="ps-product__price">
              $
              {(
                (cartItem.attributes.productOptionType === "per_qty"
                  ? 1
                  : cartItem.quantity) * cartItem.price
              ).toLocaleString()}
            </div>
          </div>
        ))
      ) : (
        <Skeleton count={4} />
      )}
      <div className="ps-checkout__row">
        <div className="ps-title">Subtotal</div>
        <div className="ps-product__price">
          {cart?.total ? `$${cart?.total.toLocaleString()}` : <Skeleton />}
        </div>
      </div>
      <div className="ps-checkout__row">
        <div className="ps-title">Tax</div>
        <div className="ps-product__price">
          {cart?.tax ? `$${cart?.tax.toLocaleString()}` : <Skeleton />}
        </div>
      </div>
      <div className="ps-checkout__row">
        <div className="ps-title">Total</div>
        <div className="ps-product__price">
          {cart?.total_with_tax ? (
            `$${cart?.total_with_tax.toLocaleString()}`
          ) : (
            <Skeleton />
          )}
        </div>
      </div>

      <div className="ps-checkout__row">
        <VoucherInput submitting={submitting} setSubmitting={setSubmitting} />
      </div>

      <div className="ps-checkout__payment">
        <button
          className="ps-btn ps-btn--warning custom-button"
          type="submit"
          disabled={submitting}
        >
          Place order
        </button>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
