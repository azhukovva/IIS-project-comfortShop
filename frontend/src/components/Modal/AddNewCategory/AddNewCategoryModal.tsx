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
import { axiosAuth } from "../../../utils/axios";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import LoginModal from "../../Login/LoginModal/LoginModal";
import { AxiosError } from "axios";

const initialState = {
  name: "",
  slug: "",
};

const AddNewCategory = () => {
  const [categoryData, setCategoryData] = useState(initialState);
  const {
    handleAddNewCategory,
    handleIsAuth,
    isAuth,
    handleLoginClick,
    isLoginClicked,
    token,
    user,
  } = useContext(Context);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCategoryData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const addCategory = async () => {
    if (!isAuth) {
      handleLoginClick(true);
      return;
    }
    const categoryWithSlug = {
      ...categoryData,
      slug: generateSlug(categoryData.name), // Generate a UUID for the slug
    };
    try {
      const axiosAuthInstance = axiosAuth(token);
      if (categoryData.name === "") {
        alert("Category name is required");
        return;
      }
      const response = await axiosAuthInstance.post(
        "/api/categories/",
        categoryWithSlug
      ); // Use the authenticated Axios instance
      console.log("Category added:", response.data);
      handleAddNewCategory(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          "Error adding category:",
          error.response?.data || error.message
        );
      } else {
        console.log("Error adding category:", error);
      }
    }
  };

  const proposeCategory = async () => {
    if (!isAuth || !user) {
      handleLoginClick(true);
      return;
    }
    try {
      const axiosAuthInstance = axiosAuth(token);
      if (categoryData.name === "") {
        alert("Category name is required");
        return;
      }
      const response = await axiosAuthInstance.post(
        "/api/proposed_categories/",
        categoryData
      );
      console.log("Category proposed:", response.data);
      handleAddNewCategory(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          "Error proposing category:",
          error.response?.data || error.message
        );
      } else {
        console.log("Error proposing category:", error);
      }
    }
  };

  useEffect(() => {
    if (!isAuth) {
      handleLoginClick(true);
      handleAddNewCategory(false);
      return;
    }
  });

  return (
    <>
      {isLoginClicked && (
        <LoginModal
          onClose={() => handleLoginClick(false)}
          onSubmit={() => {
            handleLoginClick(false);
            handleIsAuth(true);
          }}
          handleIsAuth={handleIsAuth}
        />
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
        </div>
      </Modal>
    </>
  );
};

export default AddNewCategory;
