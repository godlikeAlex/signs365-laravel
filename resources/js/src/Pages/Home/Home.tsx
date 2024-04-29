import React, { useState } from "react";
import CategoryService from "@/src/services/CategoryService";
import { ICategoryWithProducts } from "@/src/types/models";
import { toast } from "react-toastify";
import { ProductCard, ProductCardPlaceholder } from "@/src/components";
import { useAppSelector } from "@/src/hooks";
import HomeSlider from "./HomeSlider";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";

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
                          allowFullPage
                          {...product}
                          key={`${product.id}-${idx}`}
                          fullPage={product.with_checkout}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="ps-shop__more">
                    <Link
                      to={`/shop/category/${slug}`}
                      style={{ display: "block" }}
                      className="home_show_more"
                    >
                      Show all
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <Outlet />
    </>
  );
}
