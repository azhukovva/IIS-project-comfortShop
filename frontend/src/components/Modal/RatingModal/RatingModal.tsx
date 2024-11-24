import React, { ChangeEvent, useCallback, useContext, useState } from "react";
import { axiosAuth, PostType } from "../../../utils/axios";
import Modal from "../Modal";
import Input from "../../Input/Input";

import classes from "./RatingModal.module.css";
import { Context } from "../../../utils/Context";

type PostCreateType = {
  header: string;
  text: string;
};

const initialState: PostCreateType = {
  header: "",
  text: "",
};

type ModaalProps = {
  onClose: () => void;
};

const RatingModal = ({ onClose }: ModaalProps) => {
  const [state, setState] = useState(initialState);

  const { token } = useContext(Context);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const onAddPost = async () => {
    try {
    const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.post("/api/posts/", state);
      console.log("Post added:", response.data);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const onDeletePost = async (id: number) => {
    try {
        const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.delete(`/api/posts/${id}`);
      console.log("Post added:", response.data);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const comment = "Help us to improve our service by adding your rating!";

  return (
    <Modal
      title="Add Rating"
      textOk="Add"
      textCancel="Cancel"
      onSubmit={onAddPost}
      onClose={onClose}
      comment={comment}
      iconName="add"
    >
      <div className={classes.container}>
        <Input
          name="header"
          value={state.header}
          labelText="Title"
          placeholder="Enter Post Title"
          onChange={handleInputChange}
        />
        <Input
          isBig
          name="text"
          value={state.text}
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

export default RatingModal;
