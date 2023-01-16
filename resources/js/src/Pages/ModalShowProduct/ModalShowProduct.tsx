import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

import "./style.css";
import { Outlet, Path, useLocation, useNavigate } from "react-router-dom";
import { IProduct } from "@/src/types/models";
import { VariantsProductPlaceholder } from "@/src/components";

interface Props {}

interface ILocation extends Path {
  state: {
    product: IProduct;
  };
}

const ModalShowProduct: React.FC<Props> = ({}: Props) => {
  const location: ILocation = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: location.state?.product ? true : false,
  });

  useEffect(() => {
    if (!location.state.product) {
      // need fetch
    }
  }, [location]);

  const { product } = location.state;

  return (
    <>
      <Dialog open onClose={() => navigate(-1)}>
        <div className="headless-bg">
          <Dialog.Panel className="headless-popup">
            <div className="images-headless"></div>

            <div className="headless-content">
              <Dialog.Title>{product.title}</Dialog.Title>
              <Dialog.Description
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></Dialog.Description>

              <h3>Variants</h3>
              <VariantsProductPlaceholder />
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
