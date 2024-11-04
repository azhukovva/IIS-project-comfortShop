import React, { useContext } from "react";
import AddCategory from "../../pages/Categories/AddCategory/AddCategory";
import AddNewItem from "../Item/AddNewItem/AddNewItem";
import { Context } from "../../utils/Context";

import classes from "./Footer.module.css";

const Footer = () => {
  const { handleAddNewItem, handleAddNewCategory } = useContext(Context);
  return (
    <footer className={classes.container}>
      <AddCategory onClick={() => handleAddNewCategory(true)} />
      <AddNewItem onClick={() => handleAddNewItem(true)} />{" "}
    </footer>
  );
};

export default Footer;
