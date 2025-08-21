import { Dialog } from "@headlessui/react";

import classes from "./Modal.module.scss";
import { PropsWithChildren } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export default function Modal({
  isOpen,
  close,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Dialog className={classes.modalRoot} open={isOpen} onClose={close}>
      <div className={classes.modalBackdrop}></div>

      <div className={classes.modal}>
        <div className={classes.modalContentWrapper}>
          <Dialog.Panel className={classes.modalContent}>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
