import React from "react";

import classes from "./AddNewItem.module.css";
import { Icon } from "@iconify/react";
import icons from "../../../utils/icons";

type PropsType = {
    onClick: () => void;
}

const AddNewItem = ({onClick}: PropsType) => {

  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardOverlay} onClick={onClick}>
        <span className={classes.text}>
          Add products you want to sell!
        </span>
        <div className={classes.titleContainer}><h2 className={classes.title}>Add New Item</h2><Icon icon={icons.add} width={36}/></div>
      </div>
    </div>
  );
};

export default AddNewItem;
