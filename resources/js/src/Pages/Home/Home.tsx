import React, { useState } from "react";
import { useAppSelector } from "@/src/hooks";
import { login } from "@/src/redux/authSlice";
import { useDispatch } from "react-redux";
import CategoryService from "@/src/services/CategoryService";
import { ICategoryWithProducts } from "@/src/types/models";
import { toast } from "react-toastify";
import { ProductCard, ProductCardPlaceholder } from "@/src/components";
import { Outlet } from "react-router-dom";

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

  console.log(state);

  return state.categories.map((category, idx) => {
    const { products, id, title, slug } = category;

    return (
      <>
        <div key={id}>
          <h2>{title}</h2>

          {products.map((product, idx) => (
            <ProductCard {...product} key={`${product.id}-${idx}`} />
          ))}
        </div>

        <Outlet />
      </>
    );
  });
  // <div style={{ display: "flex", justifyContent: "space-between" }}>
  //   <div>
  //     <ProductCardPlaceholder />
  //   </div>

  //   <div>
  //     <ProductCardPlaceholder />
  //   </div>

  //   <div>
  //     <ProductCardPlaceholder />
  //   </div>
  // </div>
}
