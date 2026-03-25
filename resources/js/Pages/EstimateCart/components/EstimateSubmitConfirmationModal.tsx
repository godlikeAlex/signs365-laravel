import Button from "@/src/components/Button";
import Modal from "@/src/components/Modal";

import classes from "../EstimateCart.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  requestID: string | null;
}

export default function EstimateSubmitConfirmationModal({
  isOpen,
  onClose,
  requestID,
}: Props) {
  return (
    <Modal isOpen={isOpen} close={onClose}>
      <div className={classes.confirmationModal}>
        <h4 className={classes.confirmationTitle}>Estimate Submitted</h4>
        {requestID ? (
          <p className={classes.requestID}>
            Request ID: <strong>{requestID}</strong>
          </p>
        ) : null}
        <p className={classes.confirmationText}>
          We will review your request and contact you to confirm pricing and
          project details.
        </p>

        <Button
          type="button"
          variant="primary"
          color="primary-600"
          className={classes.confirmationButton}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
