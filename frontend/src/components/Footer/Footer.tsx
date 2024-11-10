import React, { useContext } from "react";
import AddCategory from "../../pages/Categories/AddCategory/AddCategory";
import AddNewItem from "../Item/AddNewItem/AddNewItem";
import { Context } from "../../utils/Context";

import classes from "./Footer.module.css";
import Button from "../Button/Button";

const Footer = () => {
  const { handleAddNewItem, handleAddNewCategory } = useContext(Context);
  return (
    <footer className={classes.container}>
      <div className={classes.content}>
        {/* <AddCategory onClick={() => handleAddNewCategory(true)} />
        <AddNewItem onClick={() => handleAddNewItem(true)} /> */}
        <Button isActive iconName="add" onClick={() => handleAddNewItem(true)}>
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
    </footer>
  );
};

export default Footer;
