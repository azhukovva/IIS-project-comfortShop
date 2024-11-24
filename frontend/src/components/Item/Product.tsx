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
  onDelete?: () => void;
};

const Product = ({ item, isNotInBasket, onDelete }: PropsType) => {
  const [showModal, setShowModal] = useState(false);

  const {handleIsAuth} = useContext(Context)

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={classes.cardContainer}>
      <div
        className={classes.photoContainer}
        style={{ backgroundImage: `url(${item.image})` }}
      >
      <Icon icon={isNotInBasket ? "" : icons.delete} className={classes.basketIcon} onClick={onDelete}/>
      </div>
      <div className={classes.textContainer}>
        <span style={{ textTransform: "uppercase" }}>{item.title}</span>
        <span>{item.price}</span>
      </div>
    </div>
  );
};

export default Product;
