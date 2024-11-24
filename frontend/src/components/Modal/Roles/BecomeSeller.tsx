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

  const { token, user, handleLoginClick } = useContext(Context);
  const onPomote = async () => {
    if (!user){
        handleLoginClick(true);
        return
    }
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.post(
        `/api/users/${user?.id}/promote_to_entrepreneur/`
      );
      console.log("Promoted to seller:", response.data);
      onClose();
    } catch (error) {
      console.error("Failed to promote:", error);
    }
  };

  return (
    <Modal
      title="Become a Seller"
      textOk="Become a seller"
      textCancel="Cancel"
      onSubmit={onPomote}
      onClose={onClose}
      comment={comment}
      iconName="user"
    >
      <div></div>
    </Modal>
  );
};

export default BecomeSeller;
