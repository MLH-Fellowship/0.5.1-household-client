import React from "react";
import { Modal, Button, Input } from "antd";
import { useToasts } from "react-toast-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";

const HouseShareModal = ({
  showModal,
  toggleModalState,
  shareableLink = "https://www.google.com",
}) => {
  const { addToast } = useToasts();
  return (
    <Modal
      className="house-share-modal"
      title="Share your house invite link."
      visible={showModal}
      onOk={toggleModalState}
      onCancel={toggleModalState}
    >
      <p>Here is the link to invite your friends to this house</p>
      <div className="modal-link-wrapper">
        <Input readOnly value={shareableLink} />
        <CopyToClipboard
          text={shareableLink}
          onCopy={() => {
            addToast("Copied to clipboard", { appearance: "success" });
          }}
        >
          <Button type="primary">Copy</Button>
        </CopyToClipboard>
      </div>
      <br />
      <p>
        Please keep it safe because anyone with the link can join your house.
      </p>
    </Modal>
  );
};

export default HouseShareModal;
