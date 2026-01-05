import { Children, CSSProperties, PropsWithChildren } from "react";

import styles from "./HomePageSection.module.scss";
import classNames from "classnames";

interface Props {
  altColor?: boolean;
  style?: CSSProperties | undefined;
}

export default function HomePageSection({
  children,
  altColor = false,
  style,
}: PropsWithChildren<Props>) {
  return (
    <section
      className={classNames(styles.section, altColor && styles.sectionAlt)}
      style={{ paddingBlock: 80, ...style }}
    >
      {children}
    </section>
  );
}

HomePageSection.Title = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className={styles.headingContainer}>
    <h2>{title}</h2>
    <p className={styles.headingDescription}>{description}</p>
  </div>
);
