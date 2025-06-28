import React, { useContext, useEffect } from "react";
import MainProductContext from "../src/contexts/MainProductContext";
import ProductReducer, {
  ProductActionKind,
} from "@/src/reducers/ProductReducer";
import { IProduct, IProductDefault } from "@/src/types/ProductModel";
import { Link } from "@inertiajs/react";
import {
  FAQProduct,
  ProductCheckoutForm,
  ProductContactForm,
  ProductSlider,
  SEOHead,
} from "@/src/components";
import SelectProductFile, {
  SelectProductFileRef,
} from "@/src/components/SelectProductFile/SelectProductFile";
import { jsonLdScriptProps } from "react-schemaorg";
import ProductCheckoutType from "@/src/components/Products/ProductCheckoutType";
import ProductFormType from "@/src/components/Products/ProductFormType";

interface Props {
  product: { data: IProduct };
}

interface ProductProps {
  product: IProduct;
}

function Product({ product }: ProductProps) {
  const { state } = useContext(MainProductContext);
  const dragAndDropRef = React.useRef<SelectProductFileRef>(null);
  console.log("HELL OWORD");

  return (
    <>
      <SEOHead
        title={product.seo_title ? product.seo_title : product.title}
        description={product.seo_desc}
        keywords={product.seo_keywords}
      >
        {/* <script
          {...jsonLdScriptProps<DTS.Product>({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            brand: "Signs7",
            image:
              product.images.length > 0
                ? `/storage/${product.images[0].path}`
                : undefined,
            offers: {
              "@type": "Offer",
              url: "",
              priceCurrency: "USD",
              price: "",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              ratingCount: "5",
            },
          })}
        /> */}
      </SEOHead>

      {product.with_checkout ? (
        <ProductCheckoutType product={product} />
      ) : (
        <ProductFormType product={product as IProductDefault} />
      )}
    </>
  );
}

export default ({ product }: Props) => {
  const [state, dispatch] = React.useReducer(ProductReducer, {
    status: "idle",
    product: null,
    selectedOption: undefined,
    selectedAddons: [],
    price: undefined,
    unit: "feet",
  });

  useEffect(() => {
    dispatch({ type: ProductActionKind.INIT_PRODUCT, payload: product.data });
  }, [product]);

  const value = { state, dispatch };

  return (
    <MainProductContext.Provider value={value}>
      <Product product={product.data} />
    </MainProductContext.Provider>
  );
};
