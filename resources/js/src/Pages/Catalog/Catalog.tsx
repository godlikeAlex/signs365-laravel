import { ProductCard } from "@/src/components";
import CatalogService from "@/src/services/CatalogService";
import { ICategory, IProduct } from "@/src/types/models";
import classNames from "classnames";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import CatalogProducts from "./CatalogProducts";
import { Helmet } from "react-helmet";

interface CatalogProps {}

interface State {
  productsLoading: boolean;
  categoriesLoading: boolean;
  categoriesProductCount: number;
  currentCategory?: ICategory;
  categories: ICategory[];
  products: IProduct[];
  pageCount: number;
}

const Catalog: React.FC<CatalogProps> = ({}: CatalogProps) => {
  const params = useParams<"categorySlug">();

  const [state, setState] = useState<State>({
    productsLoading: true,
    categoriesLoading: true,
    categoriesProductCount: 0,
    currentCategory: undefined,
    pageCount: 0,
    categories: [],
    products: [],
  });
  const [collapseCategories, setCollapseCategories] = useState(true);

  const fetchProducts = React.useCallback(
    async (page: number | string, currentCategory: ICategory) => {
      const { data } = await CatalogService.products(
        currentCategory.slug,
        page
      );

      setState((oldState) => ({
        ...oldState,
        products: data.data,
        productsLoading: false,
        pageCount: data.meta.last_page,
      }));
    },
    []
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCategories = async () => {
      const categoryResponse = await CatalogService.getCategory(
        params.categorySlug
      );
      const categories = await CatalogService.categories();

      setState((oldState) => ({
        ...oldState,
        categoriesLoading: false,
        categoriesProductCount: categoryResponse.data.count_products,
        currentCategory: categoryResponse.data.category,
        categories: categories.data.categories,
      }));
    };

    fetchCategories();

    return () => {
      setState({
        productsLoading: true,
        categoriesLoading: true,
        categoriesProductCount: 0,
        currentCategory: undefined,
        categories: [],
        pageCount: 0,
        products: [],
      });
    };
  }, [params]);

  return (
    <>
      <Helmet>
        <title>
          {state.currentCategory?.title ? state.currentCategory?.title : "Shop"}
        </title>
      </Helmet>

      <div className="ps-categogy">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link to="/">Home</Link>
            </li>

            <li className="ps-breadcrumb__item active" aria-current="page">
              Catalog
            </li>

            {state.currentCategory && (
              <li className="ps-breadcrumb__item active" aria-current="page">
                {state.currentCategory.title}
              </li>
            )}
          </ul>
          {!state.categoriesLoading ? (
            <h1 className="ps-categogy__name">
              {state.currentCategory.title}
              <sup>({state.categoriesProductCount})</sup>
            </h1>
          ) : (
            <Skeleton height={50} />
          )}
          <div className="ps-categogy__content">
            <div className="row row-reverse">
              <div className="col-12 col-md-9">
                <CatalogProducts
                  currentCategory={state.currentCategory}
                  products={state.products}
                  loading={state.productsLoading}
                  fetchProducts={fetchProducts}
                  pageCount={state.pageCount}
                />
              </div>
              <div className="col-12 col-md-3">
                {!state.categoriesLoading ? (
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
                          {state.categories.map((category) => (
                            <li
                              key={`category-${category.slug}`}
                              className={classNames({
                                active:
                                  state.currentCategory.id === category.id,
                              })}
                            >
                              <Link
                                to={`/catalog/${category.slug}`}
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
                                  <i className="fa fa-chevron-right"></i>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Skeleton height={25} />

                    <Skeleton count={10} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
