import React from "react";

import classes from "./Product.module.css";
import { useParams } from "react-router-dom";

const Product = () => {
  const { category, subcategory } = useParams();
  return <div>Item</div>;
};

export default Product;
