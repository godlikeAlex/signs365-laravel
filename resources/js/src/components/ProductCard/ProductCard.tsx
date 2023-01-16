import { useAppDispatch } from "@/src/hooks";
import { IProduct } from "@/src/types/models";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props extends IProduct {}

const ProductCard: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { title, start_at, id, slug } = props;

  const [fetching, setIsFetch] = useState(false);

  const handleAddToCart = async () => {
    setIsFetch(true);

    try {
      setIsFetch(false);
    } catch (error) {
      setIsFetch(false);
    }
  };

  return (
    <div>
      <h4>{title}</h4>

      <h6>{(start_at / 100).toLocaleString()}</h6>

      <Link
        to={`/product/${slug}`}
        state={{ backgroundLocation: location, product: props }}
      >
        Show Product
      </Link>
    </div>
  );
};

export default ProductCard;
