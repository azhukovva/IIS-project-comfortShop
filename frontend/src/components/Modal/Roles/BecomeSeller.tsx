import React, { useContext } from "react";
import Input from "../../Input/Input";
import Modal from "../Modal";
import { Context } from "../../../utils/Context";
import { axiosAuth } from "../../../utils/axios";

type BecomeSellerProps = {
  onClose: () => void;
};

const BecomeSeller = ({ onClose }: BecomeSellerProps) => {
  const comment =
    "You dont have permission to sell yet. We need some time to verify your account. You will be notified by email when you can start selling. Thank You!";

  return (
    <Modal
      title="Become a Seller"
      textOk="Yes, I want to become a seller"
      textCancel="Cancel"
      onSubmit={onClose}
      onClose={onClose}
      comment={comment}
      iconName="user"
    >
      <div></div>
    </Modal>
  );
};

export default BecomeSeller;
