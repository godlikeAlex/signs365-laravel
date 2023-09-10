import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Dropzone from "../Dropzone";
import { FileState } from "../Dropzone/Dropzone";
import { Dialog } from "@headlessui/react";

interface Props {
  submitHandler: (files?: FileState[]) => void;
}

export interface SelectProductFileRef {
  showModal: () => void;
  closeModal: () => void;
}

const SelectProductFile = forwardRef<SelectProductFileRef, Props>(
  function SelectProductFile(props, ref) {
    const [state, setState] = useState<{
      showModal: boolean;
      files: FileState[];
      disabled: boolean;
    }>({
      files: [],
      showModal: false,
      disabled: true,
    });

    useImperativeHandle(ref, () => {
      return {
        showModal() {
          setState({
            showModal: true,
            files: [],
            disabled: true,
          });
        },
        closeModal() {
          setState({
            showModal: false,
            files: [],
            disabled: true,
          });
        },
      };
    });

    useEffect(() => {
      setState((currentState) => ({
        ...currentState,
        disabled: state.files.length === 0,
      }));
    }, [state.files]);

    const onAddCart = () => {
      props.submitHandler(state.files);
      setState({ files: [], showModal: false, disabled: false });
    };

    console.log(state.files);

    return (
      <Dialog
        open={state.showModal}
        onClose={() =>
          setState({ files: [], showModal: false, disabled: true })
        }
      >
        <div className="headless-bg">
          <Dialog.Panel className="headless-popup">
            <div
              className="modal-body headless-content"
              style={{ textAlign: "center" }}
            >
              <h3 style={{ color: "#103178", marginBottom: 25 }}>
                Please Specify An Image
              </h3>
              <Dropzone
                onDrop={(files) =>
                  setState((currentState) => ({ ...currentState, files }))
                }
              />

              <div className="col-md-6" style={{ margin: "auto" }}>
                <button
                  type="submit"
                  className="ps-btn ps-btn--warning"
                  onClick={onAddCart}
                  style={{ marginTop: 25 }}
                  disabled={state.disabled}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }
);

export default SelectProductFile;
