import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { IProductsPagination } from "@/src/types/axiosResponses";
import { ICategory } from "@/src/types/models";
import classNames from "classnames";
import CatalogProducts from "@/src/Pages/Catalog/CatalogProducts";
import { Breadcrumbs, CatalogSection, SEOHead } from "@/src/components";

interface Props {
  productsWithPagination: IProductsPagination;
  currentCategory: ICategory;
  categories: ICategory[];
}

const Catalog: React.FC<Props> = ({
  productsWithPagination,
  currentCategory,
  categories,
}: Props) => {
  const { data: products, meta } = productsWithPagination;

  return (
    <>
      <SEOHead title={currentCategory.title}></SEOHead>

      <CatalogSection backgroundColor={currentCategory.colors.alternative}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Breadcrumbs>
                <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
                <Breadcrumbs.Item>{currentCategory.title}</Breadcrumbs.Item>
              </Breadcrumbs>
            </div>

            <div className="col-md-12 mt-40 text-center">
              <CatalogSection.Title
                icon={`/storage/${currentCategory.active_icon}`}
              >
                {currentCategory.title}
              </CatalogSection.Title>
            </div>

            <div className="col-md-12 mt-50">
              <CatalogProducts
                currentCategory={currentCategory}
                categories={categories}
                products={products}
                pageCount={meta.last_page}
                currentPage={meta.current_page}
              />
            </div>
          </div>
        </div>
      </CatalogSection>
    </>
  );
};

export default Catalog;
