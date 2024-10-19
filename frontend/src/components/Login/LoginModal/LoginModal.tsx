import React, { useCallback, ChangeEvent, useState } from "react";
import Modal from "../../Modal/Modal";

import classes from "./LoginModal.module.css";
import Input from "../../Input/Input";

type PropsType = {
  onSubmit: () => void;
  onClose: () => void;
};

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

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const comment = "Buy, Sell and Trade your items with us!";

  return (
    <Modal
      title="Log in"
      textOk="Log in"
      textCancel="Cancel"
      onSubmit={() => {}}
      onClose={() => {}}
      comment={comment}
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
