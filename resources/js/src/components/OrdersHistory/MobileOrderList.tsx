import { IOrder } from "@/src/types/models";
import React from "react";

interface Props {
  loading: boolean;
  items: IOrder[];
  pageCount: number;
  fetchData: (
    {
      pageIndex,
    }: {
      pageIndex: any;
    },
    loadMore: boolean
  ) => void;
}

const MobileOrderList: React.FC<Props> = ({
  items,
  loading,
  fetchData,
  pageCount,
}: Props) => {
  const [pageIndex, setPageIndex] = React.useState(0);

  React.useEffect(() => {
    fetchData({ pageIndex }, true);
  }, [fetchData, pageIndex]);

  const handleLoadMore = () => {
    setPageIndex(pageIndex + 1);
  };

  return (
    <>
      <ul className="ps-shopping__list">
        {items.map((order) => (
          <li key={`${order.uuid}-mobile`}>
            <div className="ps-product ps-product--wishlist">
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="">
                    UUID: {order.uuid} - {order.id}
                  </a>
                </h5>

                <div className="ps-product__row">
                  <div className="ps-product__label">Status:</div>
                  <div className="ps-product__value">
                    <span className="ps-product__price">{order.status}</span>
                  </div>
                </div>

                <div className="ps-product__row">
                  <div className="ps-product__label">Total without tax:</div>
                  <div className="ps-product__value">
                    <span className="ps-product__price">
                      ${order.total_without_tax.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="ps-product__row">
                  <div className="ps-product__label">Price:</div>
                  <div className="ps-product__value">
                    <span className="ps-product__price">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* <div className="ps-product__row ps-product__quantity">
                <div className="ps-product__label">Quantity:</div>
                <div className="ps-product__value">{cartItem.quantity}</div>
              </div>
              <div className="ps-product__row ps-product__subtotal">
                <div className="ps-product__label">Subtotal:</div>
                <div className="ps-product__value">
                  ${(cartItem.price * cartItem.quantity).toLocaleString()}
                </div>
              </div> */}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="ps-shopping__list">
        <div className="ps-form__submit" style={{ marginBottom: 10 }}>
          <button
            className="ps-btn ps-btn--warning"
            disabled={loading}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileOrderList;
