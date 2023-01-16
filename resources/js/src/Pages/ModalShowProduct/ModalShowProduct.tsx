import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

import "./style.css";
import { Outlet, Path, useLocation, useNavigate } from "react-router-dom";
import { IProduct, IProductVaraint } from "@/src/types/models";
import { VariantsProductPlaceholder } from "@/src/components";
import ProductService from "@/src/services/ProductService";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/src/hooks";
import { addToCart } from "@/src/redux/cartSlice";

interface Props {}

interface ILocation extends Path {
  state: {
    product: IProduct;
  };
}

interface IState {
  loading: boolean;
  productVaraintsLoaded: boolean;
  productVariants?: IProductVaraint[];
  currentVaraint?: IProductVaraint;
}

const ModalShowProduct: React.FC<Props> = ({}: Props) => {
  const location: ILocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<IState>({
    loading: location.state?.product ? true : false,
    productVariants: undefined,
    productVaraintsLoaded: false,
    currentVaraint: undefined,
  });

  const { product } = location.state;

  useEffect(() => {
    if (!location.state.product) {
      // need fetch PRODUCT if joined by link
    }
  }, [location]);

  useEffect(() => {
    const fetchVariants = async () => {
      const { data } = await ProductService.getProductVariants(product.id);

      if (data.variants.length > 0) {
        setState((currentState) => ({
          ...currentState,
          productVaraintsLoaded: true,
          productVariants: data.variants,
          currentVaraint: data.variants[0],
        }));
      } else {
        toast("Variants not found, try reload page", { type: "warning" });
      }
    };

    if (product) {
      fetchVariants();
    }
  }, [product]);

  const handleSelectVariant = (productVariant: IProductVaraint) => {
    setState((currentState) => ({
      ...currentState,
      currentVaraint: productVariant,
    }));
  };

  const handleAddToCart = async () => {
    dispatch(
      addToCart({
        product_id: product.id,
        product_variant_id: state.currentVaraint.id,
      })
    );
    toast("Successfully added to cart", { type: "success" });
  };

  return (
    <>
      <Dialog open onClose={() => navigate(-1)}>
        <div className="headless-bg">
          <Dialog.Panel className="headless-popup">
            <div className="images-headless"></div>

            <div className="headless-content">
              <Dialog.Title className={"product_modal_title"}>
                {product.title}
              </Dialog.Title>
              {state.productVaraintsLoaded && state.currentVaraint ? (
                <div className="product_modal_price">
                  {state.currentVaraint.price.toLocaleString()} $
                </div>
              ) : (
                <div>Loading...</div>
              )}
              <Dialog.Description
                className={"product_modal_desc"}
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></Dialog.Description>
              <h3>Variants</h3>
              {state.productVaraintsLoaded ? (
                <div className="product-variants-container">
                  {state.productVariants.map((productVariant) => (
                    <div
                      className={
                        productVariant.id === state.currentVaraint.id
                          ? "product-variant active"
                          : "product-variant"
                      }
                      onClick={() => handleSelectVariant(productVariant)}
                    >
                      <h5>{productVariant.label}</h5>
                      <h6>{productVariant.price.toLocaleString()} $</h6>
                    </div>
                  ))}
                </div>
              ) : (
                <VariantsProductPlaceholder />
              )}

              <div className="add-to-cart" onClick={handleAddToCart}>
                Add to cart
              </div>
            </div>

            {/* <p dangerouslySetInnerHTML={{ __html: product.description }}></p> */}

            {/* <button onClick={() => setIsOpen(false)}>Deactivate</button> */}
            {/* <button onClick={() => setIsOpen(false)}>Cancel</button> */}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ModalShowProduct;
