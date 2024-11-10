import React, { ChangeEvent, useCallback, useContext, useState } from "react";
import Modal from "../Modal";

import classes from "./AddNewCategoryModal.module.css";
import { Context } from "../../../utils/Context";
import Input from "../../Input/Input";

const initialState = {
  name: "",
  description: "",
};

const AddNewCategory = () => {
  const [categoryData, setCategoryData] = useState(initialState);
  const { handleAddNewCategory } = useContext(Context);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCategoryData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  return (
    <Modal
      title="Add New Category"
      textOk="Add"
      textCancel="Cancel"
      onSubmit={() => {}}
      onClose={() => handleAddNewCategory(false)}
      iconName="add"
    >
      <div className={classes.container}>
        <Input
          name="name"
          value={categoryData.name}
          labelText="Category Name"
          placeholder="Name"
          isRequired
          onChange={handleInputChange}
        />
        <Input
          name="description"
          value={categoryData.description}
          labelText="Category Description"
          placeholder="Add description"
          isRequired={false}
          onChange={handleInputChange}
          isBig
        />
      </div>
    </Modal>
  );
};

export default AddNewCategory;
