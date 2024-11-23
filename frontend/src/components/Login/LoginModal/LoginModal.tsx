import React, { useCallback, ChangeEvent, useState, useContext } from "react";
import Modal from "../../Modal/Modal";

import classes from "./LoginModal.module.css";
import Input from "../../Input/Input";
import { Context } from "../../../utils/Context";
import { axiosAuth, post, UserType } from "../../../utils/axios";
import { useAuth } from "../../../utils/Authentification/AuthProvider";

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

  const { setUser, handleLoginClick, handleIsAuth, showPopup, handlePopup, setToken } =
    useContext(Context);

  const { authToken } = useAuth();

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

      const response = await post("/api/login/", {
        username: state.username,
        password: state.password,
      });

      console.log("Login response:", response, state.username, state.password);

      if (response?.data?.token) {
        setToken(response.data.token);
        
        //TODO 
        const axiosAuthInstance = axiosAuth(response.data.token);
        
        const responseUser = await axiosAuthInstance.get(`/api/user/${state.username}`);
        const currentUserInfo: UserType = responseUser.data;
        
        setUser(currentUserInfo);
        console.log("User logged in:", currentUserInfo);
        
        onSubmit ? onSubmit() : onClose(); // Trigger the onSubmit callback if login is successful
        handleIsAuth(true);
        handlePopup(true);
        setTimeout(() => handlePopup(false), 2000);
      }
    } catch (error) {
      console.log(error);
      handleIsAuth(false);
      onClose();
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
