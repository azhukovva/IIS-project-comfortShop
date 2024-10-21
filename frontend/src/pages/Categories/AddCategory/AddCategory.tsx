import React from "react";

import classes from "./AddCategory.module.css";
import { Icon } from "@iconify/react";
import icons from "../../../utils/icons";

const AddCategory = () => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardOverlay}>
        <span className={classes.text}>
          You want to sell products that do
          not fit into existing categories? Add your own!
        </span>
        <div className={classes.titleContainer}><h2 className={classes.title}>Add Category</h2><Icon icon={icons.add} width={36}/></div>
        
      </div>
    </div>
  );
};

export default AddCategory;
