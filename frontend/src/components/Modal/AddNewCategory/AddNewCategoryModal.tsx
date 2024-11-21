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
  name: '',
  slug: '',
};

const AddNewCategory = () => {
  const [categoryData, setCategoryData] = useState(initialState);
  const { handleAddNewCategory, handleIsAuth, isAuth, handleLoginClick, isLoginClicked } =
    useContext(Context);
  const [showLoginModal, ] = useState(false); // State to show login modal

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
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  }

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
      if (categoryData.name === '') {
        alert('Category name is required');
        return;
      }
      const response = await axiosAuth.post('/api/categories/', categoryWithSlug); // Use the authenticated Axios instance
      console.log('Category added:', response.data);
      handleAddNewCategory(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Error adding category:', error.response?.data || error.message);
      } else {
        console.log('Error adding category:', error);
      }
    }
  };

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
          {/* <Input
          name="slug"
          value={categoryData.slug}
          labelText="Category short description"
          placeholder="Add one word to describe Your category"
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


