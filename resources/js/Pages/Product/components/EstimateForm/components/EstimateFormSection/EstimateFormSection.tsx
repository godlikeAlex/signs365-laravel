import { PropsWithChildren } from "react";

import styles from "./EstimateFormSection.module.scss";

export default function EstimateFormSection({ children }: PropsWithChildren) {
  return <section className={styles.estimateFormSection}>{children}</section>;
}

EstimateFormSection.Title = function EstimateFormSectionTitle({
  children,
}: PropsWithChildren) {
  return <h4>{children}</h4>;
};

EstimateFormSection.Disclaimer = function EstimateFormSectionDisclaimer({
  children,
}: PropsWithChildren) {
  return <p>{children}</p>;
};
