import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./ProductPage.module.css";
import { get, ProductType } from "../../utils/axios";
import Button from "../../components/Button/Button";
import { images } from "../../utils/images";
import icons from "../../utils/icons";
import { Icon } from "@iconify/react";
import { Context } from "../../utils/Context";
import RatingCard from "./RatingCard/RatingCard";
import RatingModal from "../../components/Modal/RatingModal/RatingModal";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>();
  const [posts, setPosts] = useState([]);

  const [isAddRating, setIsAddRating] = useState(false);

  const { handleIsAuth } = useContext(Context);

  // Fetch product info
  const fetch = async () => {
    try {
      const response = await get(`api/products/${id}`);
      setProduct(response.data);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await get(`api/rating/${id}`);
      console.log(response.data);
      setPosts(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //TODO
  const addToBasket = async () => {
    try {
      console.log("add to basket");
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        handleIsAuth(true);
      }
      const user = { username: authToken };
      // const response = axiosAuth.post(`/api/baskets/add_product`, {user})
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
    fetch();
    fetchPosts();
  }, []);

  return (
    <Page>
      <div className={classes.rowTop}>
        <Button isBack isActive onClick={() => navigate(-1)}>
          <Icon icon={icons.left} width={20} />
        </Button>
      </div>

      {product && (
        <div className={classes.content}>
          <div className={classes.leftSide}>
            <div className={classes.imageContainer}>
              <img src={product.image} className={classes.image} />
            </div>
            <div className={classes.productInfo}>
              <div className={classes.text}>
                <h1 className={classes.productTitle}>{product.title}</h1>
                <p className={classes.productPrice}>${product.price}</p>
                <p className={classes.productDescription}>
                  {product.description}
                </p>
              </div>
              <div className={classes.actions}>
                <Button isActive isOnAdd onClick={addToBasket}>
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className={classes.related}></div>
          </div>
          <div className={classes.rightSide}>
            <h2>Ratings</h2>
            <div>
              {posts.length === 0 ? (
                <p>No ratings available.</p>
              ) : (
                posts.map((post) => <RatingCard post={post}/>)
              )}
            </div>
            <Button isActive isOnAdd onClick={() => setIsAddRating(true)}>
              Add Rating
            </Button>
          </div>
        </div>
      )}
      {isAddRating && <RatingModal onClose={() => setIsAddRating(false)}/>}
    </Page>
  );
};

export default ProductPage;
