import React, { ChangeEvent, useCallback, useContext, useState } from "react";
import Input from "../../Input/Input";

import classes from "./AddUserModal.module.css";
import Modal from "../Modal";
import { Context } from "../../../utils/Context";
import { axiosAuth } from "../../../utils/axios";

const initialState = {
  username: "",
  password: "",
};

const AddUserModal = () => {
  const [newUser, setNewUser] = useState(initialState);

  const { handleAddUser } = useContext(Context);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewUser((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );
  const handleAddUserSubmit = async () => {
    try {
      const response = await axiosAuth.post("/api/users/", newUser);
      setNewUser({ username: "", password: "" });
      handleAddUser(false);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleCancelAdding = () => {
    handleAddUser(false);
    setNewUser({ username: "", password: "" });
  };

  return (
    <Modal
      title="Add New User"
      textOk="Add"
      textCancel="Cancel"
      onSubmit={handleAddUserSubmit}
      onClose={handleCancelAdding}
      iconName="add"
    >
      <div className={classes.container}>
        <Input
          name="username"
          value={newUser.username}
          labelText="Username"
          placeholder="Username"
          isRequired
          onChange={handleInputChange}
        />
        <Input
          name="password"
          value={newUser.password}
          labelText="Password"
          placeholder="Password"
          isRequired
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

export default AddUserModal;
