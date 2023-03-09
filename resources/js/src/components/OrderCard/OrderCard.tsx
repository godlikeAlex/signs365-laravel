import React from "react";
import "./style.css";
import Collapse, { Panel } from "rc-collapse";
// import "rc-collapse/assets/index.css";
import motion from "./motionUtil";
import { IOrder } from "@/src/types/models";
import dayjs from "dayjs";

interface Props extends IOrder {}

const arrowPath =
  "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88" +
  ".5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3." +
  "6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5." +
  "2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z";

function expandIcon({ isActive }) {
  return (
    <i style={{ marginRight: ".5rem" }}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={{
          verticalAlign: "-.125em",
          transition: "transform .2s",
          transform: `rotate(${isActive ? 90 : 0}deg)`,
        }}
      >
        <path d={arrowPath} />
      </svg>
    </i>
  );
}

const OrderCard: React.FC<Props> = ({
  status,
  total_without_tax,
  total,
  address,
  uuid,
  created_at,
  order_items,
}: Props) => {
  return (
    <div className={"order-item"} style={{ marginBottom: 25 }}>
      <div className="order-item-panel-title">
        <h2>
          Order UUID{" "}
          <strong style={{ textTransform: "uppercase" }}>{uuid}</strong>
        </h2>
      </div>

      <div className="order-item-content">
        <div className="row">
          <div className="col-md-2 col-6 order-item-title">Status:</div>
          <div className="col-md-10 col-6 order-item-value">{status}</div>
        </div>

        <div className="row">
          <div className="col-md-2 col-6 order-item-title">Order Date:</div>
          <div className="col-md-10 col-6 order-item-value">
            {dayjs(created_at).format("MMM D, YYYY h:mm A	")}
          </div>
        </div>

        <div className="row">
          <div className="col-md-2 col-6 order-item-title">Address:</div>
          <div className="col-md-10 col-6 order-item-value">{address}</div>
        </div>

        <div className="row">
          <div className="col-md-2 col-6 order-item-title">
            Total Without Tax:
          </div>
          <div className="col-md-10 col-6 order-item-value">
            ${total_without_tax.toLocaleString()}
          </div>
        </div>

        <div className="row">
          <div className="col-md-2 col-6 order-item-title">Total:</div>
          <div className="col-md-10 col-6 order-item-value">
            ${total.toLocaleString()}
          </div>
        </div>
      </div>

      <Collapse accordion={true} openMotion={motion}>
        <Panel
          header={`${order_items.length} Orders Items`}
          expandIcon={expandIcon}
        >
          {order_items.map((item) => (
            <div className="mini-order-item" key={item.id}>
              <img
                src="https://images.umarket.uz/ccerl62bv5cpn5fb63ug/t_product_240_high.jpg"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />

              <div style={{ width: "100%", marginLeft: 25 }}>
                <div className="row">
                  <div className="col-md-2 col-6 order-item-title">Name:</div>
                  <div className="col-md-10 col-6 order-item-value">
                    {item.product.title}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2 col-6 order-item-title">
                    Quantity:
                  </div>
                  <div className="col-md-10 col-6 order-item-value">
                    {item.quantity}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2 col-6 order-item-title">Price:</div>
                  <div className="col-md-10 col-6 order-item-value">
                    ${item.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default OrderCard;
