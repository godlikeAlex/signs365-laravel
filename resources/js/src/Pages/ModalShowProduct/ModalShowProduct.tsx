import React, { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Skeleton from "react-loading-skeleton";
import ModalContentWithForm from "./ModalContentWithForm";
import withProductControl, {
  WithProductsControlProps,
} from "@/src/hoc/withProductControl";
import { ProductSlider } from "@/src/components";
import "./style.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

interface Props extends WithProductsControlProps {}

function ModalShowProduct({
  product,
  loading,
  handleAddToCart,
  handleClose,
  renderVariants,
}: Props) {
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  const navigate = useNavigate();
  const params = useParams<"slug">();
  const location = useLocation();

  useEffect(() => {
    if (isMobile || !location.state) {
      navigate(`/catalog/product/${params.slug}`, { replace: true });
    }
  }, [isMobile, params, location]);

  return (
    <Dialog open onClose={handleClose}>
      <div className="headless-bg">
        <Dialog.Panel className="headless-popup">
          <div className="modal-body headless-content">
            <div className="wrap-modal-slider  ps-quickview__body">
              <button
                className="close ps-quickview__close"
                type="button"
                onClick={handleClose}
                style={{ cursor: "pointer", zIndex: 2 }}
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="ps-product--detail">
                <div className="row">
                  <div className="col-12 col-xl-6">
                    {product?.images ? (
                      <ProductSlider
                        images={product.images}
                        productName={product.title}
                      />
                    ) : (
                      <div style={{ height: 450, marginBottom: 30 }}>
                        <Skeleton height={"100%"} />
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-xl-6">
                    <div
                      className="ps-product__info row no-gutters"
                      style={{ marginTop: 20, marginBottom: 20 }}
                    >
                      <div className="ps-product__branch col-md-12">
                        {product?.categories?.map((category) => (
                          <Link to={`/catalog/${category.slug}`}>
                            {category.title}
                          </Link>
                        )) || <Skeleton />}
                      </div>
                      <Dialog.Title className={"ps-product__title col-md-12"}>
                        <a>{product?.title || <Skeleton />}</a>
                      </Dialog.Title>

                      <div className="ps-product__desc col-md-12">
                        {product?.description ? (
                          <Dialog.Description
                            className={"product_modal_desc"}
                            dangerouslySetInnerHTML={{
                              __html: product?.description,
                            }}
                          ></Dialog.Description>
                        ) : (
                          <Skeleton count={4} />
                        )}
                      </div>

                      <div
                        className="ps-product__meta col-md-12"
                        style={{ marginTop: 0 }}
                      >
                        {product?.with_checkout ? (
                          renderVariants()
                        ) : (
                          <ModalContentWithForm product={product} />
                        )}
                      </div>

                      {product?.with_checkout ? (
                        <button
                          type="submit"
                          style={{ marginTop: 20 }}
                          className="ps-btn ps-btn--warning"
                          onClick={handleAddToCart}
                        >
                          Add to cartsss
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default withProductControl(ModalShowProduct);
