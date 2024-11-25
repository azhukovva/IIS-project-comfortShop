import React, { useContext, useEffect } from "react";
import AddCategory from "../../pages/Categories/AddCategory/AddCategory";
import AddNewItem from "../Item/AddNewItem/AddNewItem";
import { Context } from "../../utils/Context";

import classes from "./Footer.module.css";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { parseGroups } from "../../pages/ManagePanel/ManagePanel";
import BecomeSeller from "../Modal/Roles/BecomeSeller";
import LoginModal from "../Login/LoginModal/LoginModal";

const Footer = () => {
  const {
    handleAddNewItem,
    handleAddNewCategory,
    handleAddUser,
    handleLoginClick,
    isAuth,
    user,
  } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const [showBecomeModal, setShowBecomeModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  // Check if the user is entrepreneur
  const handleAddItem = () => {
    console.log("GROUPS", parseGroups(user?.groups || []));
    if (
      !parseGroups(user?.groups || []).includes("entrepreneur") &&
      !parseGroups(user?.groups || []).includes("admin") &&
      !parseGroups(user?.groups || []).includes("moderator")
    ) {
      console.log("SHOW BECOME MODAL");
      if (!user) {
        handleLoginClick(true);
      } else {
        handleAddNewItem(false);
        setShowBecomeModal(true);
      }
      return;
    } else {
      handleAddNewItem(true);
    }
  };

  return (
    <footer className={classes.container}>
      {showBecomeModal && (
        <BecomeSeller onClose={() => setShowBecomeModal(false)} />
      )}
      <div className={classes.content}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button isActive iconName="add" onClick={() => handleAddItem()}>
            Add New Item
          </Button>
          <Button
            isActive
            iconName="add"
            onClick={() => handleAddNewCategory(true)}
          >
            Add New Category
          </Button>
        </div>
        <div>
          {isAuth && user !== null && location.pathname !== "/users" && (
            <Button isActive iconName="user" onClick={() => navigate("/users")}>
              Manage Panel
            </Button>
          )}
          {isAuth && location.pathname === "/users" && (
            <Button isActive iconName="add" onClick={() => handleAddUser(true)}>
              Add New User
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
