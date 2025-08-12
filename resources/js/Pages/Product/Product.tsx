import React, { useContext, useEffect } from "react";
import MainProductContext from "@/src/contexts/MainProductContext";
import ProductReducer, {
  ProductActionKind,
} from "@/src/reducers/ProductReducer";
import { IProduct, IProductDefault } from "@/src/types/ProductModel";
import {
  BadgeCategory,
  Breadcrumbs,
  ProductSlider,
  Rating,
  SEOHead,
} from "@/src/components";
import { SelectProductFileRef } from "@/src/components/SelectProductFile/SelectProductFile";
import ProductCheckoutType from "@/src/components/Products/ProductCheckoutType";
import ProductFormType from "@/src/components/Products/ProductFormType";
import { ICategory } from "@/src/types/models";
import FeaturesBadge from "./components/FeaturesBadge";

import classes from "./Product.module.scss";
import { Link } from "@inertiajs/react";

interface Props {
  product: IProduct;
  category: ICategory;
}

export default function Product({ product, category }: Props) {
  const [state, dispatch] = React.useReducer(ProductReducer, {
    status: "idle",
    product: null,
    selectedOption: undefined,
    selectedAddons: [],
    price: undefined,
    unit: "feet",
    sizeSelectionType: "default",
  });

  useEffect(() => {
    dispatch({ type: ProductActionKind.INIT_PRODUCT, payload: product });
  }, [product]);

  return (
    <MainProductContext.Provider value={{ state, dispatch }}>
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

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-90 mt-70">
              <Breadcrumbs>
                <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>

                <Breadcrumbs.Item href={`/shop/${category.slug}`}>
                  {category.title}
                </Breadcrumbs.Item>

                <Breadcrumbs.Item>{product.title}</Breadcrumbs.Item>
              </Breadcrumbs>
            </div>

            <div className="col-md-6">
              <ProductSlider
                images={product.images}
                productName={product.title}
              />
            </div>

            <div className="col-md-6">
              <BadgeCategory
                primaryColor={category.colors.primary}
                alternativeColor={category.colors.alternative}
                format="lg"
                component={Link}
                href={`/shop/${category.slug}`}
              >
                {category.title}
              </BadgeCategory>

              <h1 className={classes.productName}>{product.title}</h1>

              <p className={classes.productDescriptionPreview}>
                Durable. Bold. Made to Get Noticed.
              </p>

              <div className={classes.productRatingContainer}>
                <Rating rating={5} size="lg" />
              </div>

              <FeaturesBadge />
            </div>
          </div>
        </div>
      </section>

      <section></section>

      {/* {product.with_checkout ? (
        <ProductCheckoutType product={product} />
      ) : (
        <ProductFormType product={product as IProductDefault} />
      )} */}
    </MainProductContext.Provider>
  );
}

// export default ({ product, category }: Props) => {
//   const [state, dispatch] = React.useReducer(ProductReducer, {
//     status: "idle",
//     product: null,
//     selectedOption: undefined,
//     selectedAddons: [],
//     price: undefined,
//     unit: "feet",
//     sizeSelectionType: "default",
//   });

//   useEffect(() => {
//     dispatch({ type: ProductActionKind.INIT_PRODUCT, payload: product.data });
//   }, [product]);

//   const value = { state, dispatch };

//   return (
//     <MainProductContext.Provider value={value}>
//       <Product product={product.data} category={category.data} />
//     </MainProductContext.Provider>
//   );
// };
