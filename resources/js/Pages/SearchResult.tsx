import {
  Breadcrumbs,
  CatalogSection,
  EmptyPage,
  ProductCard,
  SEOHead,
} from "@/src/components";

import { IProductCard } from "@/src/types/models";

import searchIconPath from "@/assets/icons/search.svg";

interface Props {
  searchTerm: string;
  products: IProductCard[];
}

const SearchResult: React.FC<Props> = ({ searchTerm, products }: Props) => {
  return (
    <>
      <SEOHead title={`Results for "${searchTerm}" request`} />

      <CatalogSection backgroundColor="#FFCA19">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Breadcrumbs>
                <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
                <Breadcrumbs.Item>Search Result</Breadcrumbs.Item>
              </Breadcrumbs>
            </div>

            <div className="col-md-12 mt-40 text-center">
              <CatalogSection.Title icon={searchIconPath}>
                Search Result
              </CatalogSection.Title>
            </div>

            <div className="col-md-12 mt-50">
              <div className="row">
                {products.length > 0 ? (
                  products.map((product, idx) => (
                    <div
                      className="col-12 col-lg-4 col-xl-3 mb-25"
                      key={`${product.id}-${idx}`}
                    >
                      <ProductCard {...product} variant="catalog" />
                    </div>
                  ))
                ) : (
                  <EmptyPage
                    iconClass="fa-solid fa-basket-shopping"
                    title="No Products Here"
                    size="small"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </CatalogSection>
    </>
  );
};

export default SearchResult;
