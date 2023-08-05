import { ProductContext } from "@/src/contexts/ProductContext";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import Input from "../Input";
import { selectProductOption } from "@/src/redux/singleProductSlice";

interface Props {}

const ProductOptions: React.FC<Props> = ({}: Props) => {
  const { product, selectedOption, loading } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  if (product.with_checkout === false) return;

  return (
    <div className="row">
      {product && loading === false ? (
        <div>
          {product.options.length === 1 ? (
            <div className="col-md-12">
              <h6 className="label-product-show">
                Option: {product.options[0].title}
              </h6>
            </div>
          ) : (
            <div
              className="col-md-12"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <div className="col-md-12">
                <h6 className="label-product-show">Option:</h6>
              </div>

              {product.options.map((option) => (
                <div
                  className={classNames("product-variant", {
                    "active-variant": option.id === selectedOption?.id,
                  })}
                  key={`${product.id}-${option.id}-o`}
                  onClick={() => dispatch(selectProductOption(option))}
                >
                  <h6 style={{ marginBottom: 0 }}>
                    {option.title}

                    {/* <div style={{ marginTop: 10 }}>${option.price}</div> */}
                  </h6>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className="col-md-12"
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
