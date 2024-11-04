import React, { useContext, useState } from "react";
import Modal from "../Modal";

import classes from "./AddNewCategoryModal.module.css";
import { Context } from "../../../utils/Context";

const initialState = {
  name: "",
  description: "",
};

const AddNewCategory = () => {
  const [categoryData, setCategoryData] = useState(initialState);
  const {handleAddNewCategory} = useContext(Context);
  return (
    <Modal
      title="Add New Category"
      textOk="Add"
      textCancel="Cancel"
      onSubmit={() => {}}
      onClose={() => handleAddNewCategory(false)}
      iconName="add"
    >
      <div className={classes.container}></div>
    </Modal>
  );
};

export default AddNewCategory;
