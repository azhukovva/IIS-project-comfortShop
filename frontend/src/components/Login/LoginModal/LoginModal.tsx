import React, { useCallback, ChangeEvent, useState, useContext } from "react";
import Modal from "../../Modal/Modal";

import classes from "./LoginModal.module.css";
import Input from "../../Input/Input";
import { Context } from "../../../utils/Context";
import { post, UserType } from "../../../utils/axios";

type LoginModalProps = {
  onSubmit?: () => void;
  onClose: () => void;
  handleIsAuth: (isAuth: boolean) => void;
};

const initialState = {
  username: "",
  password: "",
};

const LoginModal = ({ onSubmit, onClose }: LoginModalProps) => {
  const [state, setState] = useState(initialState); // user state

  const { setUser, handleLoginClick, handleIsAuth, showPopup, handlePopup } =
    useContext(Context);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleLogin = async () => {
    try {
      if (state.username === "" || state.password === "") {
        return;
      }

      // axios without auth
      const response = await post("/api/login/", {
        username: state.username,
        password: state.password,
      });

      if (response?.data?.token) {
        console.log("Login response:", response.data);
        localStorage.setItem("authToken", response.data.token); // Store the token in localStorage

        const userData: UserType = {
          id: "",
          username: state.username,
        };
        setUser(userData); 
        onSubmit ? onSubmit() : onClose(); // Trigger the onSubmit callback if login is successful
        handleIsAuth(true);
        handlePopup(true);
        setTimeout(() => handlePopup(false), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const comment = "Buy, Sell and Share your items with us!";

  return (
    <Modal
      title="Log in"
      textOk="Log in"
      textCancel="Cancel"
      onSubmit={handleLogin}
      onClose={onClose}
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
          type="password"
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
