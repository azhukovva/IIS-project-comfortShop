import React, { useContext } from "react";
import AddCategory from "../../pages/Categories/AddCategory/AddCategory";
import AddNewItem from "../Item/AddNewItem/AddNewItem";
import { Context } from "../../utils/Context";

import classes from "./Footer.module.css";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { parseGroups } from "../../pages/ManagePanel/ManagePanel";
import BecomeSeller from "../Modal/Roles/BecomeSeller";

const Footer = () => {
  const { handleAddNewItem, handleAddNewCategory, handleAddUser, isAuth, user } =
    useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const [showBecomeModal, setShowBecomeModal] = React.useState(false);

  // Check if the user is entrepreneur
  const handleAddItem = () => {
    if (!parseGroups(user?.groups || []).includes("entrepreneur") ) {
    handleAddNewItem(true)
    setShowBecomeModal(true);
  }
}

  return (
    <footer className={classes.container}>
      {showBecomeModal && <BecomeSeller onClose={() => setShowBecomeModal(false)}/>}
      <div className={classes.content}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            isActive
            iconName="add"
            onClick={handleAddItem}
          >
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
