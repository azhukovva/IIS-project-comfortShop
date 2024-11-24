import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./Container.module.css";

import { images } from "../../utils/images";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { Context } from "../../utils/Context";
import LoginModal from "../Login/LoginModal/LoginModal";
import AddNewItemModal from "../Modal/AddNewItemModal/AddNewItemModal";
import AddNewCategoryModal from "../Modal/AddNewCategory/AddNewCategoryModal";
import Modal from "../Modal/Modal";
import Popup from "../Popup/Popup";
import AddUserModal from "../Modal/AddUser/AddUserModal";

type PropsType = {
  children: React.ReactNode;
};

const Container = ({ children }: PropsType) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  const {
    isLoginClicked,
    handleLoginClick,
    isLogoutClicked,
    handleLogoutClick,
    isAddNewItemClicked,
    isAddNewCategoryClicked,
    isAddUser,
    isAuth,
    handleIsAuth,
    showPopup,
    setToken,
    setUser,
    handlePopup,
  } = useContext(Context);

  const LogoutModal = () => {
    const handleLogout = async () => {
      try {
        setToken(null);
        setUser(null);
        handleIsAuth(false)
        handleLogoutClick(false)
        navigate("/categories");
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Modal
        title="Log out"
        textOk="Log out"
        textCancel="Cancel"
        onSubmit={handleLogout}
        onClose={() => handleLogoutClick(false)}
        iconName="logout"
      >
        <div className={classes.modalContainer}><span>Are You sure You want to Log Out?</span></div>
      </Modal>
    );
  };

  const isWelcomePage = location.pathname === "/";
  const isMainPage = location.pathname === "/categories";
  const isBasketPage = location.pathname === "/basket";

  // Extract filter parameters from the URL (e.g., /categories?category=home)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<string[]>([]);

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

      <div className={isWelcomePage ? "" : classes.content}>{children}</div>
      {isLoginClicked && (
        <LoginModal
          onClose={() => handleLoginClick(false)}
          onSubmit={handleLoginClick}
          handleIsAuth={handleIsAuth}
        />
      )}
      {showPopup && isAuth && <Popup text="Logged in!" isGood/>}
      {isLogoutClicked && <LogoutModal />}
      {isAddNewItemClicked && <AddNewItemModal />}
      {isAddNewCategoryClicked && <AddNewCategoryModal />}
      {isAddUser && <AddUserModal />}
      {!isBasketPage && !isWelcomePage && <Footer />}
    </div>
  );
};

export default Container;
