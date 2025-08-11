import { PropsWithChildren } from "react";

import classes from "./CatalogSection.module.scss";

type Props = {
  backgroundColor: string;
};

function CatalogSection({
  children,
  backgroundColor,
}: PropsWithChildren<Props>) {
  return (
    <section
      style={{ ["--bg-section" as string]: backgroundColor }}
      className={classes.catalogSection}
    >
      {children}
    </section>
  );
}

CatalogSection.Title = function ({ children }: PropsWithChildren) {
  return <h2 className={classes.catalogSectionTitle}>{children}</h2>;
};

export default CatalogSection;
