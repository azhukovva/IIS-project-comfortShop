import React, { useCallback, ChangeEvent, useState, useContext } from "react";
import Modal from "../../Modal/Modal";

import classes from "./SignInModal.module.css";
import Input from "../../Input/Input";
import { Context } from "../../../utils/Context";
import { axiosAuth, post, UserType } from "../../../utils/axios";
import Popup from "../../Popup/Popup";

type LoginModalProps = {
  onSubmit?: () => void;
  onClose: () => void;
  handleIsAuth?: (isAuth: boolean) => void;
};

const initialState = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
};

const LoginModal = ({ onSubmit, onClose }: LoginModalProps) => {
  const [state, setState] = useState(initialState); // user state

  const {
    setUser,
    handleLoginClick,
    handleIsAuth,
    showPopup,
    handlePopup,
    setToken,
  } = useContext(Context);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleSignin = async () => {
    try {
      if (
        state.username === "" ||
        state.password === "" ||
        !state.email.includes("@")
      ) {
        return;
      }

      const response = await post("http://localhost:8000/api/register/", {
        username: state.username,
        email: state.email,
        password: state.password,
        first_name: state.first_name,
        last_name: state.last_name,
      });

      if (response?.data) {
        console.log("Login response:", response.data);

        setToken(response.data.token);

        const axiosAuthInstance = axiosAuth(response.data.token);
        
        const responseUser = await axiosAuthInstance.get(`/api/users/me`);
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
    <>
      {showPopup && <Popup text="Login successful!" />}
      <Modal
        title="Sign in"
        textOk="Sign in"
        textCancel="Cancel"
        onSubmit={handleSignin}
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
            type="password"
            value={state.password}
            labelText="Password"
            isRequired
            placeholder="Enter your Password"
            onChange={handleInputChange}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <Input
              name="first_name"
              value={state.first_name}
              labelText="First Name"
              isRequired={false}
              placeholder="Enter your First Name"
              onChange={handleInputChange}
            />
            <Input
              name="last_name"
              value={state.last_name}
              labelText="Last Name"
              isRequired={false}
              placeholder="Enter your Last Name"
              onChange={handleInputChange}
            />
          </div>
          <Input
            name="email"
            value={state.email}
            labelText="Email"
            isRequired
            placeholder="Enter your Email"
            onChange={handleInputChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
