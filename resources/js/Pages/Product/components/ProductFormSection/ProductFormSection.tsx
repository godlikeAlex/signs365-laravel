import { PropsWithChildren } from "react";

import classes from "./ProductFormSection.module.scss";

type Props = {};

export default function ProductFormSection({
  children,
}: PropsWithChildren<Props>) {
  return <section className={classes.productFormSection}>{children}</section>;
}

ProductFormSection.Title = function ({ children }: PropsWithChildren) {
  return <h5 className={classes.productFormSectionTitle}>{children}</h5>;
};
