import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Dropzone from "../Dropzone";
import { FileState } from "../Dropzone/Dropzone";
import { Dialog } from "@headlessui/react";
import "./style.css";

interface Props {
  submitHandler: (files?: FileState[]) => Promise<void>;
}

export interface SelectProductFileRef {
  showModal: () => void;
  closeModal: () => void;
}

const SelectProductFile = forwardRef<SelectProductFileRef, Props>(
  function SelectProductFile(props, ref) {
    const [step, setStep] = React.useState(1);

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
          setStep(1);
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

    const onAddCart = async () => {
      setState((currentState) => ({ ...currentState, disabled: true }));

      await props.submitHandler(state.files);

      setState({ files: [], showModal: false, disabled: false });
    };

    const onAddCartWithoutFiles = async () => {
      await props.submitHandler(undefined);
      setState({ files: [], showModal: false, disabled: false });
    };

    const nextStep = () => setStep((currentStep) => currentStep + 1);
    const prevStep = () => setStep((currentStep) => currentStep - 1);

    const SelectionScreen = () => (
      <>
        <div className="container">
          <h3 style={{ color: "#103178", marginBottom: 25 }}>
            Provide your design
          </h3>

          <div className="row">
            <div className="col-md-6">
              <button
                className="card-upload-selection"
                onClick={onAddCartWithoutFiles}
              >
                <i className="fa-solid fa-ban"></i>

                <div className="card-upload-selection-text">
                  I don't have a design
                </div>
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="card-upload-selection"
                onClick={() => nextStep()}
              >
                <i className="fa-solid fa-upload"></i>

                <div className="card-upload-selection-text">
                  I have a design
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );

    const UploadScreen = () => (
      <>
        <h3 style={{ color: "#103178", marginBottom: 25 }}>
          Please Specify An Image
        </h3>
        <Dropzone
          onDrop={(files) => setState((state) => ({ ...state, files }))}
          files={state.files}
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
      </>
    );

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
              {step === 1 ? <SelectionScreen /> : null}
              {step === 2 ? <UploadScreen /> : null}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }
);

export default SelectProductFile;
