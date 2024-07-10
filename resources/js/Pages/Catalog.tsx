import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { IProductsPagenation } from "@/src/types/axiosResponses";
import { ICategory } from "@/src/types/models";
import classNames from "classnames";
import CatalogProducts from "@/src/Pages/Catalog/CatalogProducts";
import { SEOHead } from "@/src/components";

interface Props {
  productsWithPagenation: IProductsPagenation;
  categories: ICategory[];
  currentCategory: ICategory;
  countedProducts: number;
  // productsLoading: boolean;
  // categoriesLoading: boolean;
  // categoriesProductCount: number;
  // currentCategory?: ICategory;
  // categories: ICategory[];
  // products: IProduct[];
  // pageCount: number;
}

const Catalog: React.FC<Props> = ({
  productsWithPagenation,
  categories,
  currentCategory,
  countedProducts,
}: Props) => {
  const { data: products, meta } = productsWithPagenation;

  console.log(meta);

  const [collapseCategories, setCollapseCategories] = useState(true);

  return (
    <>
      <SEOHead title={currentCategory.title}></SEOHead>

      <div className="ps-categogy">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>

            <li className="ps-breadcrumb__item active" aria-current="page">
              Shop
            </li>

            <li className="ps-breadcrumb__item active" aria-current="page">
              {currentCategory.title}
            </li>
          </ul>
          <h1 className="ps-categogy__name">
            {currentCategory.title}
            <sup>({countedProducts})</sup>
          </h1>

          <div className="ps-categogy__content">
            <div className="row row-reverse">
              <div className="col-12 col-md-9">
                <CatalogProducts
                  currentCategory={currentCategory}
                  products={products}
                  pageCount={meta.last_page}
                  currentPage={meta.current_page}
                />
              </div>
              <div className="col-12 col-md-3">
                <div className="ps-widget ps-widget--product">
                  <div className="ps-widget__block">
                    <h4 className="ps-widget__title">Categories</h4>
                    <a
                      className={classNames({
                        "ps-block-control": true,
                        active: collapseCategories,
                      })}
                      onClick={(e) => {
                        e.preventDefault();
                        setCollapseCategories((isCollapsed) => !isCollapsed);
                      }}
                    >
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <div
                      className="ps-widget__content ps-widget__category"
                      style={{
                        display: collapseCategories ? "block" : "none",
                      }}
                    >
                      <ul className="menu--mobile">
                        {categories.map((category) => (
                          <li
                            key={`category-${category.slug}`}
                            className={classNames({
                              active: currentCategory.id === category.id,
                            })}
                          >
                            <Link
                              href={`/shop/category/${category.slug}`}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              {category.title}
                              <span
                                className="category-go-icon"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <i className="fa-solid fa-chevron-right"></i>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
