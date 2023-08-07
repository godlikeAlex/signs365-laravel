import { ProductContext } from "@/src/contexts/ProductContext";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import Input from "../Input";
import { selectProductOption } from "@/src/redux/singleProductSlice";
import { ProductFormContext } from "@/src/contexts/ProductFormContext";

interface Props {
  loading: boolean;
}

const ProductOptions: React.FC<Props> = ({ loading }: Props) => {
  const { state } = useContext(ProductFormContext);
  const { product, selectedOption } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  if (product.with_checkout === false) return;

  return (
    <div>
      {product && loading === false ? (
        <div>
          {product.options.length === 1 ? (
            <h6>Option: {product.options[0].title}</h6>
          ) : (
            <>
              <h6>Options:</h6>

              <div
                className="ps-product__size ps-select--feature"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {product.options.map((option) => (
                  <a
                    className={classNames({
                      active: option.id === selectedOption?.id,
                      "disabled-variant": state.disabled,
                    })}
                    style={{ marginRight: 10, marginTop: 10 }}
                    key={`${product.id}-${option.id}-o`}
                    onClick={(e) => {
                      e.preventDefault();

                      if (state.disabled) {
                        return;
                      }

                      dispatch(selectProductOption(option));
                    }}
                    href="#"
                  >
                    {option.title}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ width: "33%" }}>
            <Skeleton height={35} width={"100%"} />
          </div>
          <div style={{ width: "33%" }}>
            <Skeleton height={35} width={"100%"} />
          </div>
          <div style={{ width: "33%" }}>
            <Skeleton height={35} width={"100%"} />
          </div>
        </div>
      )}

      {/* <div className="col-md-12" style={{ marginTop: 20 }}>
        {productVaraintsLoaded && currentVaraint ? (
          <span className="ps-product__price">${currentVaraint.price}</span>
        ) : (
          <Skeleton height={52} width={"35%"} />
        )}
      </div> */}
    </div>
  );
};

export default ProductOptions;
