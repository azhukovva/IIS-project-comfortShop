import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./ProductPage.module.css";
import { axiosAuth, get, PostType, ProductType } from "../../utils/axios";
import Button from "../../components/Button/Button";
import { images } from "../../utils/images";
import icons from "../../utils/icons";
import { Icon } from "@iconify/react";
import { Context } from "../../utils/Context";
import RatingCard from "./RatingCard/RatingCard";
import RatingModal from "../../components/Modal/RatingModal/RatingModal";
import SignInModal from "../../components/Modal/SignInModal/SignInModal";
import Popup from "../../components/Popup/Popup";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>();
  const [posts, setPosts] = useState<PostType[]>([]);

  const [isAddRating, setIsAddRating] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupRating, setShowPopupRating] = useState(false);

  const { handleIsAuth, token, user, handleLoginClick } = useContext(Context);

  // Fetch product info
  const fetch = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.get(`api/products/${id}`);
      setProduct(response.data);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.get(`api/rating/${id}`);
      const data = response.data;
      const formattedData = Array.isArray(data) ? data : [data];

      console.log(response.data);
      // if (Array.isArray(response.data)) {
      //   setPosts(response.data);
      // } else {
      //   console.error("Response data is not an array:", response.data);
      // }
      setPosts(formattedData);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  console.log(posts)

  const addToBasket = async () => {
    try {
      console.log("add to basket");

      if (!user) {
        handleLoginClick(true);
      }

      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.post(
        `/api/baskets/add_product`,
        {
          product_id: id,
          quantity: 1,
        }
      );

      console.log(response);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
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


  const onDeletePost = async (id: number) => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.delete(`/api/rating/${id}`);
      console.log("Post added:", response.data);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const handleCloseRating = () => {
    setIsAddRating(false)
    setShowPopupRating(true);
    setTimeout(() => setShowPopupRating(false), 2000);
  }

  useEffect(() => {
    if (user) {
      fetch();
      fetchPosts();
    }
  }, [user, id, token, isAddRating]);

  return (
    <Page>
      {showPopup && <Popup text="Product added!" isGood />}
      {showPopupRating && <Popup text="Rating added!" isGood />}
      <div className={classes.rowTop}>
        <Button isBack isActive onClick={() => navigate(-1)}>
          <Icon icon={icons.left} width={20} />
        </Button>
      </div>

      {user && product ? (
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
                Array.isArray(posts) && posts.map((post) => <RatingCard post={post} />)
              )}
            </div>
            <Button isActive isOnAdd onClick={() => setIsAddRating(true)}>
              Add Rating
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.isEmpty}>
          <span className={classes.isEmptyText}>
            Please log in to view product details
          </span>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button isActive onClick={() => handleLoginClick(true)}>
              Log In
            </Button>
            <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
          </div>
        </div>
      )}
      {isAddRating && id && <RatingModal onClose={handleCloseRating} productId={id} onFetch={fetchPosts}/>}
      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)}/>
      )}
    </Page>
  );
};

export default ProductPage;
