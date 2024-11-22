import React, { useContext } from "react";
import AddCategory from "../../pages/Categories/AddCategory/AddCategory";
import AddNewItem from "../Item/AddNewItem/AddNewItem";
import { Context } from "../../utils/Context";

import classes from "./Footer.module.css";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const { handleAddNewItem, handleAddNewCategory, handleAddUser, isAuth } =
    useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className={classes.container}>
      <div className={classes.content}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            isActive
            iconName="add"
            onClick={() => handleAddNewItem(true)}
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
          {isAuth && location.pathname !== "/users" && (
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
