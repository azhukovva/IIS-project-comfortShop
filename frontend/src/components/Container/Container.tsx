import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./Container.module.css";

import { images } from "../../utils/images";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { categoriesMap, Context } from "../../utils/Context";
import LoginModal from "../Login/LoginModal/LoginModal";
import AddNewItemModal from "../Modal/AddNewItemModal/AddNewItemModal";
import AddNewCategoryModal from "../Modal/AddNewCategory/AddNewCategoryModal";

type PropsType = {
  children: React.ReactNode;
};

const Container = ({ children }: PropsType) => {
  const location = useLocation();
  const { category } = useParams<{ category: string }>();

  const {
    isLoginClicked,
    handleLoginClick,
    isAddNewItemClicked,
    isAddNewCategoryClicked,
  } = useContext(Context);

  const isWelcomePage = location.pathname === "/";
  const isMainPage = location.pathname === "/categories";
  const isBasketPage = location.pathname === "/basket";

  // Extract filter parameters from the URL (e.g., /categories?category=home)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<string[]>([]);

  useEffect(() => {
    if (category && categoriesMap[category]) {
      setSelectedCategory(category);
      console.log("Selected Category:", category); // Debugging
      setSubCategories(categoriesMap[category]); // Set subcategories based on the selected category
    } else {
      setSelectedCategory(null);
      setSubCategories([]); // Reset if the category doesn't exist
    }
  }, [category]);

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isLoginClicked || isAddNewItemClicked || isAddNewCategoryClicked) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "auto";
    }

    // Cleanup to reset scroll behavior when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoginClicked, isAddNewItemClicked, isAddNewCategoryClicked]);

  return (
    <div className={classes.container}>
      {!isWelcomePage && <Header />}

      <div className={isWelcomePage ? "" : classes.content}>
        {children}
        
      </div>
      {isLoginClicked && (
        <LoginModal onClose={handleLoginClick} onSubmit={handleLoginClick} />
      )}
      {isAddNewItemClicked && <AddNewItemModal />}
      {isAddNewCategoryClicked && <AddNewCategoryModal />}
      {!isBasketPage && !isWelcomePage && <Footer />}
    </div>
  );
};

export default Container;
