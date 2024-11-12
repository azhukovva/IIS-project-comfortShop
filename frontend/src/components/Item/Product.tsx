import React, { useState } from "react";

import classes from "./Product.module.css";
import { useParams } from "react-router-dom";
import { ProductType } from "../../utils/axios";


const Product = ({product}: { product: ProductType }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const { category, subcategory } = useParams();
  console.log(category, subcategory);

  return (
    <div className={classes.productCard} onClick={handleModalToggle}>
      <div className={classes.productImage}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={classes.productDetails}>
        <h3>{product.name}</h3>
        <p className={classes.productPrice}>${product.price}</p>
        <button className={classes.quickAddButton}>Quick Add</button>
      </div>
      {showModal && (
        <div>Ahoj!</div>
        // <ProductModal product={product} onClose={handleModalToggle} />
      )}
    </div>
  );
};

export default Product;
