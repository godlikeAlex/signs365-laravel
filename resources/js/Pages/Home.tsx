import React, { useState } from "react";
import HomeSlider from "@/src/Pages/Home/HomeSlider";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { usePage } from "@inertiajs/react";
import { HomeSection, PriceList, SEOHead } from "@/src/components";
import { IProduct } from "@/src/types/ProductModel";
import ProductShowModal from "@/Modals/ProductShowModal";

interface Props {
  title: string;
}

const Home: React.FC<Props> = ({ title }: Props) => {
  const { homeCategories } = usePage<SharedInertiaData>().props;
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

        <section style={{ padding: 120 }}>
          <div className="container-fluid">
            <div className="col-md-12">
              <PriceList productWithCategories={homeCategories} />
            </div>
          </div>
        </section>

        {homeCategories.map((category, idx) => {
          return (
            <HomeSection
              key={category.id}
              title={category.title}
              titleUrl={`/shop/${category.slug}`}
              products={category.products}
              primaryColor={category.colors.primary}
              altColor={category.colors.alternative}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
