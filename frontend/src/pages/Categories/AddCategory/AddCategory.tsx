import React from "react";

import classes from "./AddCategory.module.css";
import { Icon } from "@iconify/react";
import icons from "../../../utils/icons";

const AddCategory = () => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardOverlay}>
        <span className={classes.text}>
          Create a new category for your products! If you sell products that do
          not fit into existing categories, you can add your own! Choose a name
          and description for the new category to match your product range, and
          make it easy for your customers to find your products.
        </span>
        <div className={classes.titleContainer}><h2 className={classes.title}>Add Category</h2><Icon icon={icons.add} width={36}/></div>
        
      </div>
    </div>
  );
};

export default AddCategory;
