import React from "react";
import Modal from "../../Modal/Modal";

import classes from "./LoginModal.module.css";
import Input from "../../Input/Input";

type PropsType = {
  onSubmit: () => void;
  onClose: () => void;
};

const LoginModal = () => {
  return (
    <Modal
      title="Log in"
      textOk="Log in"
      textCancel="Cancel"
      onSubmit={() => {}}
      onClose={() => {}}
    >
      <div className={classes.container}><Input labelText="Username"/></div>
    </Modal>
  );
};

export default LoginModal;
