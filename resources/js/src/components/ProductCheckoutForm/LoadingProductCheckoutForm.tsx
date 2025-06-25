import React from "react";
import Skeleton from "react-loading-skeleton";

interface LoadingProductCheckoutFormProps {}

function LoadingProductCheckoutForm({}: LoadingProductCheckoutFormProps) {
  return (
    <div
      className="ps-product__meta"
      style={{
        marginTop: 0,
        borderBottom: "1px solid #f0f2f5",
      }}
    >
      <div>
        <Skeleton height={45} />
        <Skeleton height={45} />
      </div>

      <div style={{ marginTop: 20 }}>
        <Skeleton height={140} />
      </div>
    </div>
  );
}

export default LoadingProductCheckoutForm;
