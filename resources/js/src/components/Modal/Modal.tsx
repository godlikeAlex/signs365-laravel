import { Dialog } from "@headlessui/react";

import classes from "./Modal.module.scss";
import { PropsWithChildren } from "react";
import classNames from "classnames";

interface Props {
  isOpen: boolean;
  close: () => void;
  customClasses?: {
    root?: string | CSSModuleClasses;
    modal?: string | CSSModuleClasses;
    backDrop?: string | CSSModuleClasses;
    contentWrapper?: string | CSSModuleClasses;
    content?: string | CSSModuleClasses;
  };
}

export default function Modal({
  isOpen,
  close,
  customClasses,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Dialog
      className={classNames(classes.modalRoot, customClasses?.root)}
      open={isOpen}
      onClose={close}
    >
      <div
        className={classNames(classes.modalBackdrop, customClasses?.backDrop)}
      ></div>

      <div className={classNames(classes.modal, customClasses?.modal)}>
        <div
          className={classNames(
            classes.modalContentWrapper,
            customClasses?.contentWrapper
          )}
        >
          <Dialog.Panel
            className={classNames(classes.modalContent, customClasses?.content)}
          >
            <button className={classes.closeButton} onClick={close}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
