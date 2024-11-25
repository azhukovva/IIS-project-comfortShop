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
import { axiosAuth, get } from "../../../utils/axios";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import LoginModal from "../../Login/LoginModal/LoginModal";
import { AxiosError } from "axios";
import { parseGroups } from "../../../pages/ManagePanel/ManagePanel";
import Dropdown from "../../Dropdown/Dropdown";

const initialState = {
  name: "",
  slug: "",
  parent: "",
};

const AddNewCategory = () => {
  const [categoryData, setCategoryData] = useState(initialState);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesSlugs, setCategoriesSlugs] = useState<string[]>([]);
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
      console.log("Category with slug:", categoryWithSlug);
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
        "/api/proposed_categories/",
        categoryWithSlug
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

  const fetchCategories = async () => {
    try {
      const response = await get("/api/categories");
      const categories = response.data.map((category: any) => category.name);
      const categoriesSlugs = response.data.map(
        (category: any) => category.slug
      );
      setCategoriesSlugs(categoriesSlugs);
      setCategories(categories); // to dropdown
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleCategoryChange = (value: string) => {
    const categoryIndex = categories.indexOf(value);
    const categorySlug = categoriesSlugs[categoryIndex];

    setCategoryData((prev) => ({
      ...prev,
      parent: categorySlug,
    }));
  };

  useEffect(() => {
    if (!isAuth) {
      handleLoginClick(true);
      handleAddNewCategory(false);
      return;
    }
    fetchCategories();
  });

  console.log(parseGroups(user?.groups || []));

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
        onSubmit={
          parseGroups(user?.groups || []).includes("admin") ||
          parseGroups(user?.groups || []).includes("moderator")
            ? addCategory
            : proposeCategory
        }
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
          {user && !parseGroups(user.groups).includes("admin") && (
            <Dropdown
              options={categories}
              placeholder="Category"
              labelText="Category"
              onChange={handleCategoryChange}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AddNewCategory;
