import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import classes from "./AddNewItemModal.module.css";
import Modal from "../Modal";
import { Context } from "../../../utils/Context";
import Input from "../../Input/Input";
import Dropdown from "../../Dropdown/Dropdown";
import LoginModal from "../../Login/LoginModal/LoginModal";
import Button from "../../Button/Button";
import CategoryCard from "../../CategoryCard/CategoryCard";
import { axiosAuth, get, ProductType } from "../../../utils/axios";

const initialState: ProductType = {
  id: 0,
  user: {
    id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    groups: [],
  },
  image: "",
  title: "",
  description: "",
  price: "",
  category: "",
  stock: 0,
  attribute_values: [],
};

const AddNewItemModal = () => {
  const [itemData, setItemData] = useState(initialState);
  const [categories, setCategories] = useState<string[]>([]);  

  const { handleAddNewItem, isAuth, handleLoginClick, isLoginClicked, user } =
    useContext(Context);

  const currencies = ["CZK", "EUR"];


  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setItemData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleCategoryChange = (value: string) => {
    setItemData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleCurrencyChange = (value: string) => {
    setItemData((prev) => ({
      ...prev,
      currency: value,
    }));
  };

  const fetchCategories = async () => {
    try {
      const response = await get("/api/categories");
      const categories = response.data.map((category: any) => category.name);
      setCategories(categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }
  console.log(isAuth)

  //TODO
  const handleSubmitAddNewItem = async () => {
    if (!isAuth || !user) {
      console.log(user)
      console.log("User not authenticated");
      handleLoginClick(true);
      return;
    }
    try {
      const requestBody = {
        title: itemData.title,
        description: itemData.description,
        price: itemData.price,
        category: itemData.category,
        stock: itemData.stock,
        attribute_values: itemData.attribute_values,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
        },
      };
      const response = await axiosAuth.post(`/api/products`, requestBody);

      console.log("Product added:", response.data, requestBody);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed to add product:",
          (error as any).response?.data || error.message
        );
      } else {
        console.error("Failed to add product:", error);
      }
    }
  };

  useEffect(() => {
    if (!isAuth) {
      handleLoginClick(true);
      return;
    }
    fetchCategories();
  }, []);

  console.log("Item data:", itemData);

  return (
    <>
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
            name="title"
            value={itemData.title}
            labelText="Product Name"
            placeholder="Name"
            isRequired
            onChange={handleInputChange}
          />
          <Dropdown
            options={categories}
            placeholder="Category"
            labelText="Category"
            onChange={handleCategoryChange}
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
              onChange={handleCurrencyChange}
            />
          </div>
          <Input
            name="stock"
            value={itemData.stock.toString()}
            labelText="Stock"
            placeholder="Stock"
            isRequired
            onChange={handleInputChange}
          />
          <div>
            <form method="POST" encType="multipart/form-data">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  (e.target as HTMLInputElement).form?.submit();
                }}
              />
              {/* <Button type="submit">Upload</Button> */}
            </form>
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
    </>
  );
};

export default AddNewItemModal;
