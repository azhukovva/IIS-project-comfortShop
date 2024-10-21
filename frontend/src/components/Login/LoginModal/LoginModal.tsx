import React, { useCallback, ChangeEvent, useState, useContext } from "react";
import Modal from "../../Modal/Modal";

import classes from "./LoginModal.module.css";
import Input from "../../Input/Input";
import { Context } from "../../../utils/Context";

//REVIEW - need?
// type LoginStateType = {
//   username: string;
//   password: string;
// };

const initialState = {
  username: "",
  password: "",
};

const LoginModal = () => {
  const [state, setState] = useState(initialState);

  const { handleLoginClick } = useContext(Context);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const comment = "Buy, Sell and Share your items with us!";

  return (
    <Modal
      title="Log in"
      textOk="Log in"
      textCancel="Cancel"
      onSubmit={() => {}}
      onClose={handleLoginClick}
      comment={comment}
      iconName="user"
    >
      <div className={classes.container}>
        <Input
          name="username"
          value={state.username}
          labelText="Username"
          isRequired
          placeholder="Enter your Username"
          onChange={handleInputChange}
        />
        <Input
          name="password"
          value={state.password}
          labelText="Password"
          isRequired
          placeholder="Enter your Password"
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

export default LoginModal;
