import React, { useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./ProductPage.module.css";
import { ProductType } from "../../utils/axios";
import Button from "../../components/Button/Button";
import { images } from "../../utils/images";
import icons from "../../utils/icons";
import { Icon } from "@iconify/react";

// const productTest: ProductType = {
//   title: "Cozy Blanket",
//   description: "A soft and warm blanket to keep you cozy all day long.",
//   price: '29.99',
//   image: images.beauty,
// };

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>();

  // Fetch product info
  const fetch = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setProduct(productTest);
  // });

  return (
    <Page>
      <div className={classes.rowTop}>
        <Button isBack isActive onClick={() => navigate(-1)}>
          <Icon icon={icons.left} width={20} />
        </Button>
      </div>
      {product && (
        <div className={classes.content}>
          <div className={classes.imageContainer}>
            <img src={product.image} className={classes.image} />
          </div>
          <div className={classes.productInfo}>
            <div className={classes.text}>
              <h1 className={classes.productTitle}>{product.title}</h1>
              <p className={classes.productPrice}>
                ${product.price}
              </p>
              <p className={classes.productDescription}>
                {product.description}
              </p>
            </div>
            <div className={classes.actions}>
              <Button isActive isOnAdd>
                Add to Cart
              </Button>
            </div>
          </div>
          <div className={classes.related}></div>
        </div>
      )}
    </Page>
  );
};

export default ProductPage;
