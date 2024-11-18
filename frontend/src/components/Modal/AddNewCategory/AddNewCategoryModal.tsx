import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "../Modal";

import classes from "./AddNewCategoryModal.module.css";
import { Context } from "../../../utils/Context";
import { request } from "../../../utils/axios";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import LoginModal from "../../Login/LoginModal/LoginModal";

const initialState = {
  name: "",
  id: 0,
};

const AddNewCategory = () => {
  const [categoryData, setCategoryData] = useState(initialState);
  const { handleAddNewCategory, handleLoginClick, isAuth } =
    useContext(Context);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to show login modal

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCategoryData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const addCategory = async () => {
    if (!isAuth) {
      setShowLoginModal(true);
      return;
    }
    try {
      if (categoryData.name === "") {
        return;
      }
      await request.post.addCategory(categoryData);
      handleAddNewCategory(false);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Category added");
    }
  };

  const generateUniqueId = () => {
    const id = Math.floor(Math.random() * 1000000);
    setCategoryData((prev) => ({
      ...prev,
      id: id,
    }));
  };

  useEffect(() => {
    if (!isAuth) {
      setShowLoginModal(true);
      return;
    }
    generateUniqueId();
  }, []);

  return (
    <>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      <Modal
        title="Add New Category"
        textOk="Add"
        textCancel="Cancel"
        onSubmit={addCategory}
        onClose={() => handleAddNewCategory(false)}
        iconName="add"
      >
        <div className={classes.container}>
          <Input
            name="name"
            value={categoryData.name}
            labelText="Category Name"
            placeholder="Name"
            isRequired
            onChange={handleInputChange}
          />
          {/* <Input
          name="description"
          value={categoryData.description}
          labelText="Category Description"
          placeholder="Add description"
          isRequired={false}
          onChange={handleInputChange}
          isBig
        /> */}
        </div>
      </Modal>
    </>
  );
};

export default AddNewCategory;
