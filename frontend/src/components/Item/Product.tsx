import React, { useState } from "react";

import classes from "./Product.module.css";
import { useParams } from "react-router-dom";
import { ProductType } from "../../utils/axios";

const Product = ({ product }: { product: ProductType }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const { category, subcategory } = useParams();
  // console.log(category, subcategory);

  return (
    <div className={classes.cardContainer}>
      <div
        className={classes.photoContainer}
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
      <div className={classes.textContainer}>
        <span style={{ textTransform: "uppercase"}}>{product.title}</span>
        <span>{product.price}</span>
      </div>
    </div>
  );
};

export default Product;
