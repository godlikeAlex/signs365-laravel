import React, { useState } from "react";
import CategoryService from "@/src/services/CategoryService";
import { ICategoryWithProducts } from "@/src/types/models";
import { toast } from "react-toastify";
import { ProductCard, ProductCardPlaceholder } from "@/src/components";
import { useAppSelector } from "@/src/hooks";
import HomeSlider from "./HomeSlider";
import { Helmet } from "react-helmet";

interface IState {
  loading: boolean;
  categories: ICategoryWithProducts[];
}

export default function Home() {
  const { homeCategories } = useAppSelector((state) => state.app);

  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <div className="ps-home ps-home--4">
        <section className="ps-section--banner">
          <HomeSlider />
        </section>
        <div className="container">
          {homeCategories.map((category, idx) => {
            const { products, id, title, slug } = category;

            return (
              <section className="ps-section--featured">
                <h3 className="ps-section__title">{title}</h3>
                <div className="ps-section__content">
                  <div className="row m-0">
                    {/* PRODUCT */}
                    {products.map((product, idx) => (
                      <div className="col-6 col-md-4 col-lg-2dot4 p-0">
                        <ProductCard
                          {...product}
                          key={`${product.id}-${idx}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="ps-shop__more">
                    <a href="#">Show all</a>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
