import React, { ChangeEvent, useCallback, useContext, useState } from "react";

import classes from "./AddNewItemModal.module.css";
import Modal from "../Modal";
import { Context } from "../../../utils/Context";
import Input from "../../Input/Input";
import Dropdown from "../../Dropdown/Dropdown";

const initialState = {
  name: "",
  category: "",
  price: "",
  description: "",
};

const AddNewItemModal = () => {
  const [itemData, setItemData] = useState(initialState);

  const { handleAddNewItem } = useContext(Context);

  const currencies = ["CZK", "EUR"];
  const categories = ["Home&Cozyness", "Hobby", "Sweets", "Beauty&Care"];

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setItemData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  //TODO 
  const handleSubmitAddNewItem = () => {}

  return (
    <Modal
      title="Add New Product"
      textOk="Add"
      textCancel="Cancel"
      onSubmit={handleSubmitAddNewItem}
      onClose={() => handleAddNewItem(false)}
      iconName="add"
    >
      <div className={classes.container}>
        <Input
          name="name"
          value={itemData.name}
          labelText="Product Name"
          placeholder="Name"
          isRequired
          onChange={handleInputChange}
        />
        <Dropdown
          options={categories}
          placeholder="Category"
          labelText="Category"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "1.5rem 0rem",
          }}
        >
          <Input
            name="price"
            value={itemData.price}
            labelText="Price"
            placeholder="Price"
            isRequired
            onChange={handleInputChange}
            isSmall
          />
          <Dropdown
            options={currencies}
            placeholder="CZK"
            labelText="Currency"
          />
        </div>
        <Input
          name="description"
          value={itemData.description}
          labelText="Product Description"
          placeholder="Add description"
          isRequired={false}
          onChange={handleInputChange}
          isBig
        />
      </div>
    </Modal>
  );
};

export default AddNewItemModal;
