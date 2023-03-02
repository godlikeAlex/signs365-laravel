import React, { useState } from "react";
import CategoryService from "@/src/services/CategoryService";
import { ICategoryWithProducts } from "@/src/types/models";
import { toast } from "react-toastify";
import { ProductCard, ProductCardPlaceholder } from "@/src/components";

interface IState {
  loading: boolean;
  categories: ICategoryWithProducts[];
}

export default function Home() {
  const [state, setState] = useState<IState>({
    loading: true,
    categories: [],
  });

  React.useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
        const { data } = await CategoryService.getCategoriesWithProducts();

        setState({
          loading: false,
          categories: data.categories,
        });
      } catch (error) {
        toast("Whoopss... Something went wrong.");
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  return (
    <div className="ps-home ps-home--4">
      <div className="container">
        {state.categories.map((category, idx) => {
          const { products, id, title, slug } = category;

          return (
            <section className="ps-section--featured">
              <h3 className="ps-section__title">{title}</h3>
              <div className="ps-section__content">
                <div className="row m-0">
                  <div className="col-6 col-md-4 col-lg-2dot4 p-0">
                    {/* PRODUCT */}
                    {products.map((product, idx) => (
                      <ProductCard {...product} key={`${product.id}-${idx}`} />
                    ))}
                  </div>
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
  );
}
