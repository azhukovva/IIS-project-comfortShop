import React from "react";
import Input from "../../Input/Input";
import Modal from "../Modal";

import classes from "./BecomeSeller.module.css";

type BecomeSellerProps = {
  onClose: () => void;
};

const BecomeSeller = ({ onClose }: BecomeSellerProps) => {
  const comment =
    "You dont have permission to sell yet. We need some time to verify your account. You will be notified by email when you can start selling. Thank You!";

  return (
    <Modal
      title="Become a Seller"
      textOk="Become a seller"
      textCancel="Cancel"
      onSubmit={() => {}}
      onClose={onClose}
      comment={comment}
      iconName="user"
    >
      <div className={classes.container}></div>
    </Modal>
  );
};

export default BecomeSeller;
