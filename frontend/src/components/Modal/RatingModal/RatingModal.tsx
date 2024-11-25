import React, { ChangeEvent, useCallback, useContext, useState } from "react";
import { axiosAuth, PostType } from "../../../utils/axios";
import Modal from "../Modal";
import Input from "../../Input/Input";

import classes from "./RatingModal.module.css";
import { Context } from "../../../utils/Context";
import StarRating from "./StarRating";

type RatingCreateType = {
  user: number;
  product: string; // id
  title: string;
  text: string;
  rating: number;
};

const initialState: RatingCreateType = {
  user: 0,
  product: "",
  title: "",
  text: "",
  rating: 0,
};

type ModalProps = {
  productId: string;
  onClose: () => void;
  onFetch: () => void;
};

const RatingModal = ({ onClose, productId, onFetch }: ModalProps) => {
  const [state, setState] = useState(initialState);

  const { token, user, handleLoginClick } = useContext(Context);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  console.log(productId);

  const onAddPost = async () => {
    if (!user) {
      handleLoginClick(true);
      return;
    }
    try {
      console.log("in request", state);
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.post("/api/rating/", {
        ...state,
        user: user.id,
        product: productId,
      });
      console.log("Post added:", response.data);
      onClose();
      onFetch();
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const onDeletePost = async (id: number) => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.delete(`/api/rating/${id}`);
      console.log("Post added:", response.data);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const handleRatingChange = (value: number) => {
    setState((prevState) => ({ ...prevState, rating: value }));
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
          name="title"
          value={state.title}
          labelText="Title"
          placeholder="Enter Post Title"
          onChange={handleInputChange}
        />
        <Input
          isBig
          name="text"
          value={state.text}
          type="text"
          labelText="Rating text"
          isRequired
          placeholder="Write your rating here"
          onChange={handleInputChange}
        />
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span>Rating:</span>
          <StarRating value={state.rating} onChange={handleRatingChange} />
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
