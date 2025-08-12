import classes from "./FeaturesBadge.module.scss";

import MoneyIcon from "@/Pages/Product/assets/money.svg?react";
import DeliveryIcon from "@/Pages/Product/assets/delivery.svg?react";
import ShippingIcon from "@/Pages/Product/assets/shipping.svg?react";

export default function FeaturesBadge() {
  return (
    <ul className={classes.featuresBadge}>
      <li className={classes.featuresBadgeItem}>
        <MoneyIcon />
        100% Money Back
      </li>

      <li className={classes.featuresBadgeItem}>
        <ShippingIcon />
        Non-contact shipping
      </li>

      <li className={classes.featuresBadgeItem}>
        <DeliveryIcon />
        Free delivery
      </li>
    </ul>
  );
}
