import React from "react";
import { router, usePage } from "@inertiajs/react";
import "./style.css";
import { SharedInertiaData } from "@/src/types/inertiaTypes";

interface Props {
  submitting: boolean;
  setSubmitting: (submitting: boolean) => void;
}

function VoucherInput({ submitting, setSubmitting }: Props) {
  const { errors, cart, auth } = usePage<SharedInertiaData>().props;
  const { voucher, discount_voucher } = cart;

  const [voucherCode, setVoucherCode] = React.useState("");

  async function handleSubmitVoucher() {
    if (submitting) {
      return;
    }

    router.post(
      "/apply-voucher",
      { code: voucherCode },
      {
        preserveScroll: true,
        onStart: () => {
          setSubmitting(true);
        },
        onFinish: () => {
          setSubmitting(false);
        },
      }
    );
  }

  async function handleCancelVoucher() {
    if (!auth.user) {
      return;
    }

    if (submitting) {
      return;
    }

    router.post(
      "/cancel-voucher",
      {},
      {
        preserveScroll: true,
        onStart: () => {
          setSubmitting(true);
        },
        onFinish: () => {
          setSubmitting(false);
        },
      }
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="voucher-input">
        {voucher && auth.user ? (
          <div className="voucher-information">
            <span>Voucher: {voucher.name}</span>
            <span className="discount">Discount: {voucher.value}</span>
          </div>
        ) : (
          <input
            placeholder="Promo Code"
            disabled={submitting}
            className=" ps-input"
            onChange={(e) => setVoucherCode(e.target.value)}
          />
        )}

        <span
          className="voucher-input__button"
          onClick={voucher ? handleCancelVoucher : handleSubmitVoucher}
        >
          {voucher ? "CANCEL" : "APPLY"}
        </span>
      </div>

      {errors.voucher ? (
        <div className="error" style={{ color: "red" }}>
          {errors.voucher}
        </div>
      ) : undefined}
    </div>
  );
}

export default VoucherInput;
