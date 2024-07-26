import { Dialog } from "@headlessui/react";
import React from "react";
import SelectProductFile from "../SelectProductFile";
import Dropzone, { FileState } from "../Dropzone/Dropzone";
import { toast } from "react-toastify";
import OrderService from "@/src/services/OrderService";
import "./style.css";

interface Props {
  show: boolean;
  handleClose: () => void;
  orderItemID: number | string;
}

interface IState {
  files: FileState[];
  uploadedFiles: string[];
}

const ModalReupload: React.FC<Props> = ({
  show,
  orderItemID,
  handleClose,
}: Props) => {
  const [state, setState] = React.useState<IState>({
    files: [],
    uploadedFiles: [],
  });

  const fetchImages = React.useCallback(async () => {
    const { data } = await OrderService.getOrderItemImages(orderItemID);

    setState({ files: [], uploadedFiles: data.images });
  }, [orderItemID]);

  React.useEffect(() => {
    if (show) {
      fetchImages();
    }
  }, [show, fetchImages]);

  const handleUploadImages = async () => {
    const { data } = await OrderService.uploadFilesToOrderItems(
      orderItemID,
      state.files
    );

    if (data.ok) {
      toast("Images uploaded", { type: "success" });
      handleClose();
      setState({ files: [], uploadedFiles: [] });
    }
  };

  const handleDeleteTempFile = (fileName: string) => {
    const filteredFiles = state.files.filter((file) => file.name !== fileName);

    setState((state) => ({ ...state, files: filteredFiles }));
  };

  const handleDeleteUploadedFile = async (filePath: string) => {
    const { data } = await OrderService.deleteImageFromOrderItem(
      orderItemID,
      filePath
    );

    const filteredFiles = state.uploadedFiles.filter(
      (path) => path !== filePath
    );

    if (data.ok) {
      toast("Image deleted!", { type: "success" });
      setState((state) => ({ ...state, uploadedFiles: filteredFiles }));
    } else {
      toast("Couldn't delete the picture", { type: "error" });
    }
  };

  const thumbs = state.files.map((file) => (
    <div className="thumb-item" key={file.name}>
      <div className="thumb-inner">
        <i
          className="fa-solid fa-xmark delete-thumb text-danger"
          onClick={() => handleDeleteTempFile(file.name)}
        ></i>

        <img src={file.preview} className="thumb-img" />
      </div>
    </div>
  ));

  const uploadedThumbs = state.uploadedFiles.map((path) => (
    <div className="thumb-item" key={path}>
      <div className="thumb-inner">
        <i
          className="fa-solid fa-xmark delete-thumb text-danger"
          onClick={() => handleDeleteUploadedFile(path)}
        ></i>
        <img src={`/storage/${path}`} className="thumb-img" />
      </div>
    </div>
  ));

  return (
    <Dialog open={show} onClose={handleClose}>
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
              onDrop={(files) => setState((state) => ({ ...state, files }))}
              files={state.files}
              withThumbs={false}
            />

            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                flexWrap: "wrap",
              }}
            >
              {uploadedThumbs} {thumbs}
            </aside>

            <div className="col-md-6" style={{ margin: "auto" }}>
              <button
                type="submit"
                className="ps-btn ps-btn--warning"
                onClick={handleUploadImages}
                style={{ marginTop: 25 }}
                // disabled={state.disabled}
              >
                Upload
              </button>
            </div>

            {/* {step === 1 ? <SelectionScreen /> : null} */}
            {/* {step === 2 ? <UploadScreen /> : null} */}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalReupload;
