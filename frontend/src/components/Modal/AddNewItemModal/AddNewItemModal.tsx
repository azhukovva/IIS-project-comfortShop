import React, { useContext, useState } from "react";

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

  return (
    <Modal
      title="Add New Product"
      textOk="Add"
      textCancel="Cancel"
      onSubmit={() => {}}
      onClose={() => handleAddNewItem(false)}
      iconName="add"
    >
      <div className={classes.container}>
        <Input labelText="Product Name" placeholder="Name" isRequired />
        <Dropdown options={categories} placeholder="Category" labelText="Category" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "1.5rem 0rem"
          }}
        >
          <Input labelText="Price" placeholder="Price" isRequired isSmall />
          <Dropdown options={currencies} placeholder="CZK" labelText="Currency" />
        </div>
        <Input
          labelText="Product Description"
          placeholder="Add description"
          isRequired={false}
          isBig
        />
      </div>
    </Modal>
  );
};

export default AddNewItemModal;
