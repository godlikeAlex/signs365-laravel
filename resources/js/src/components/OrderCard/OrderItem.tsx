import { IOrderItem } from "@/src/types/models";
import React from "react";
import ModalReupload from "../ModalReupload";

interface Props extends IOrderItem {}

const OrderItem: React.FC<Props> = ({
  product,
  id,
  quantity,
  images,
  price,
}: Props) => {
  const [openModal, setOpenModal] = React.useState(false);

  const hasImages = images.length > 0;

  return (
    <>
      <ModalReupload
        show={openModal}
        handleClose={() => setOpenModal(false)}
        orderItemID={id}
      />
      <div className="mini-order-item">
        {product?.images.length >= 1 ? (
          <img
            src={`/storage/${product.images[0].path}`}
            alt={product.images[0].alt}
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 100,
              height: 100,
              background: "rgb(227, 227, 227)",
            }}
          />
        )}

        <div style={{ width: "100%", marginLeft: 25 }}>
          <div className="row">
            <div className="col-md-2 col-6 order-item-title">Name:</div>
            <div className="col-md-10 col-6 order-item-value">
              {product?.title || "Deleted Product"}
            </div>
          </div>

          <div className="row">
            <div className="col-md-2 col-6 order-item-title">Quantity:</div>
            <div className="col-md-10 col-6 order-item-value">{quantity}</div>
          </div>

          <div className="row">
            <div className="col-md-2 col-6 order-item-title">Design:</div>
            <div className="col-md-10 col-6 order-item-value">
              <span
                onClick={() => setOpenModal(true)}
                className="upload-link-underline"
              >
                Manage
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2 col-6 order-item-title">Price:</div>
            <div className="col-md-10 col-6 order-item-value">
              ${price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
