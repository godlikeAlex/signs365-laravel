import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {}

const ProductSkeleton: React.FC<Props> = ({}: Props) => {
  return (
    <div className="ps-page--product-variable">
      <div className="container">
        <div className="ps-breadcrumb">
          <Skeleton />
        </div>

        <div className="ps-page__content" style={{ marginBottom: "20px" }}>
          <div className="ps-product--detail">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-12 col-xl-6">
                    <div style={{ height: 650, marginBottom: 30 }}>
                      <Skeleton height={"100%"} />
                    </div>
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="ps-product__info">
                      <div className="ps-product__branch">
                        <Skeleton />
                      </div>
                      <div className="ps-product__title">
                        <Skeleton height={45} />
                      </div>
                      <div className="ps-product__desc">
                        <Skeleton count={5} />
                      </div>
                      <div>
                        <Skeleton count={3} />
                      </div>
                      <div>
                        <div
                          className="ps-product__meta"
                          style={{
                            marginTop: 0,
                            borderBottom: "1px solid #f0f2f5",
                          }}
                        >
                          <div style={{ marginTop: 20 }}>
                            <Skeleton height={45} />
                            <Skeleton height={45} />
                          </div>

                          <div style={{ marginTop: 20 }}>
                            <Skeleton height={140} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
