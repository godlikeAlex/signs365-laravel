import { Head } from "@inertiajs/react";
import React from "react";
import { JsonLd } from "react-schemaorg";
import { Person, Product, Store } from "schema-dts";
import route from "ziggy-js";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  children?: any;
}

const SEOHead: React.FC<Props> = ({
  title = "Online Printing Services",
  description,
  keywords,
  children,
}: Props) => {
  return (
    <Head title={title}>
      {/* <title>{title}</title> */}
      <meta property="og:title" content={title} />

      {description ? <meta name="description" content={description} /> : null}
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}

      {keywords ? <meta name="keywords" content={keywords} /> : null}

      <meta property="og:site_name" content="Signs7" />

      {children && children}
    </Head>
  );
};

export default SEOHead;
