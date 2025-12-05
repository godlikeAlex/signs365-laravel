import React, { useContext, useEffect } from "react";
import MainProductContext from "@/src/contexts/MainProductContext";
import ProductReducer, {
  ProductActionKind,
} from "@/src/reducers/ProductReducer";
import { IProduct, IProductDefault } from "@/src/types/ProductModel";
import {
  BadgeCategory,
  Breadcrumbs,
  ExpandableContent,
  FAQProduct,
  ProductSlider,
  Rating,
  SEOHead,
} from "@/src/components";
import { SelectProductFileRef } from "@/src/components/SelectProductFile/SelectProductFile";
import ProductCheckoutType from "@/src/components/Products/ProductCheckoutType";
import ProductFormType from "@/src/components/Products/ProductFormType";
import { ICategory } from "@/src/types/models";
import FeaturesBadge from "./components/FeaturesBadge";
import ProductCheckoutForm from "./components/ProductCheckoutForm";
import ProductContactForm from "./components/ProductContactForm";

import classes from "./Product.module.scss";
import { Link } from "@inertiajs/react";
import classNames from "classnames";
import ProductReviews from "./components/ProductReviews";

interface Props {
  product: IProduct;
  category: ICategory;
}

export default function Product({ product, category }: Props) {
  // const { images = [] } = product;
  const video = product.video;

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
        {product.seo_schema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: product.seo_schema }}
          />
        ) : null}
      </SEOHead>

      <section style={{ marginBottom: 108 }}>
        <div className="container">
          <div className="row">
            <div
              className={classNames("col-md-12", classes.containerBreadcrumbs)}
            >
              <Breadcrumbs>
                <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>

                <Breadcrumbs.Item href={`/shop/${category.slug}`}>
                  {category.title}
                </Breadcrumbs.Item>

                <Breadcrumbs.Item color={category.colors.primary}>
                  {product.title}
                </Breadcrumbs.Item>
              </Breadcrumbs>
            </div>

            <div className="col-md-6">
              <ProductSlider
                images={product.images}
                video={product.video}
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
                {product.short_description}
              </p>

              <div className={classes.productRatingContainer}>
                <Rating rating={product.rating} size="lg" />
              </div>

              <FeaturesBadge />

              {product.with_checkout ? (
                <ProductCheckoutForm />
              ) : (
                <ProductContactForm productSlug={product.slug} />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={classes.productSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={classes.productInfoSection}>
                <div className="row">
                  <div className="col-md-12">
                    <h3 className={classes.productInfoSectionTitle}>
                      Overview
                    </h3>
                  </div>

                  <div className="col-md-8">
                    <ExpandableContent>
                      <p
                        className={classes.productInfoSectionContent}
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </ExpandableContent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.faq && (
        <section className={classes.productSection}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className={classes.productInfoSection}>
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className={classes.productInfoSectionTitle}>FAQ</h3>
                    </div>

                    <div className="col-md-12">
                      <FAQProduct questions={product.faq || []} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <ProductReviews
        totalReviews={product.total_reviews}
        averageRating={product.rating}
        summaryRatings={product.summary_ratings}
        productID={product.id}
      />

      {video && (
        <section style={{ lineHeight: 0 }}>
          <video
            style={{
              width: "100%",
              maxHeight: "75vh",
              aspectRatio: "16/9",
              objectFit: "cover",
            }}
            controls
            preload="auto"
            autoPlay
            loop
            playsInline
            muted
            poster={`/storage/${video.cover}`}
          >
            <source src={`/storage/${video.path}`} />
          </video>
        </section>
      )}

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
