import React, { useContext, useState } from "react";

import classes from "./Product.module.css";
import { Link, useParams } from "react-router-dom";
import { axiosAuth, ProductType } from "../../utils/axios";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import { Context } from "../../utils/Context";

type PropsType = {
  item: ProductType;
  isNotInBasket?: boolean;
};

const Product = ({ item, isNotInBasket }: PropsType) => {
  const [showModal, setShowModal] = useState(false);

  const {handleIsAuth} = useContext(Context)

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const { category, subcategory } = useParams();
  // console.log(category, subcategory);

  const addToBasket = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken){
        handleIsAuth(true)
      }
      const user = { username: authToken };
      const response = axiosAuth.post(`/api/baskets/add_product`, {user})
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

  return (
    <div className={classes.cardContainer}>
      <div
        className={classes.photoContainer}
        style={{ backgroundImage: `url(${item.image})` }}
      >
      <Icon icon={isNotInBasket ? icons.basket : icons.delete} className={classes.basketIcon} />
      </div>
      <div className={classes.textContainer}>
        <span style={{ textTransform: "uppercase" }}>{item.title}</span>
        <span>{item.price}</span>
      </div>
    </div>
  );
};

export default Product;
