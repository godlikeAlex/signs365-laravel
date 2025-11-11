import { usePage } from "@inertiajs/react";
import Button from "../Button";
import { useContactModal } from "../ContactFormModal";

import classes from "./MobileCtaButton.module.scss";

export default function MobileCtaButton() {
  const { open } = useContactModal();
  const page = usePage();

  const productSLUG =
    page.component === "Product" && "product" in page.props
      ? (page.props as any).product.slug
      : null;

  return (
    <div className={classes.root}>
      <Button onClick={() => open(productSLUG)} style={{ width: "100%" }}>
        Let’s start
      </Button>
    </div>
  );
}
