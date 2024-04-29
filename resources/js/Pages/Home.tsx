import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import HomeSlider from "@/src/Pages/Home/HomeSlider";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { usePage } from "@inertiajs/react";
import classNames from "classnames";
import { ProductCard, SEOHead } from "@/src/components";
import { IProduct } from "@/src/types/ProductModel";
import ProductShowModal from "@/Modals/ProductShowModal";

interface Props {
  title: string;
}

const Home: React.FC<Props> = ({ title }: Props) => {
  const { homeCategories, cart } = usePage<SharedInertiaData>().props;
  const [product, setProduct] = useState<IProduct>();

  return (
    <>
      {!product ? (
        <SEOHead title={title} />
      ) : (
        <SEOHead
          title={product.seo_title}
          description={product.seo_desc}
          keywords={product.seo_keywords}
        />
      )}

      {product ? (
        <ProductShowModal
          product={product}
          handleClose={() => setProduct(undefined)}
        />
      ) : null}

      <div className="ps-home ps-home--4">
        <section className="ps-section--banner">
          <HomeSlider />
        </section>

        {homeCategories.map((category, idx) => {
          const { products, id, title, slug } = category;

          return (
            <section
              className={classNames({
                "ps-section--featured": true,
                "main-section": true,
                "alt-section": idx % 2 === 0,
              })}
            >
              <div className="container-fluid">
                <h3 className="ps-section__title">{title}</h3>
                <div className="ps-section__content">
                  <div className="row m-0">
                    {/* PRODUCT */}
                    {products.map((product, idx) => (
                      <div className="col-md-3 p-0">
                        <ProductCard
                          {...product}
                          key={`${product.id}-${idx}`}
                          allowFullPage={product.with_checkout === false}
                          onClickQuickView={(quickViewProduct) =>
                            setProduct(quickViewProduct)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="ps-shop__more">
                    <a
                      href={`/catalog/${slug}`}
                      style={{ display: "block" }}
                      className="home_show_more"
                    >
                      Show all
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default Home;
