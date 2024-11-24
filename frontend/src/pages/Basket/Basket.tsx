import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";

import classes from "./Basket.module.css";
import { Link } from "react-router-dom";
import { axiosAuth, BasketProductType } from "../../utils/axios";
import Product from "../../components/Item/Product";
import { Context } from "../../utils/Context";
import SignInModal from "../../components/Modal/SignInModal/SignInModal";

const Basket = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [basketItems, setBasketItems] = useState<BasketProductType[]>([]);

  const [showSignInModal, setShowSignInModal] = useState(false);

  const { handleIsAuth, token, user, handleLoginClick } = useContext(Context);

  const getBasketItems = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = axiosAuthInstance.get(`/api/baskets/${user?.id}`);
      setBasketItems((await response).data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed to fetch products:",
          (error as any).response?.data || error.message
        );
      } else {
        console.error("Failed to fetch products:", error);
      }
    }
  };

  const removeFromBasket = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const authToken = token;
      if (!authToken) {
        handleIsAuth(true);
      }
      const response = axiosAuthInstance.post(`/api/baskets/add_product`, user);
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

  console.log(user);

  useEffect(() => {
    if (!user) {
      handleIsAuth(true);
    }
    getBasketItems();
  }, [user]);

  return (
    <Page title="My basket" isBasketPage isHeader>
      <div className={classes.basketContentContainer}>
        {!user ? (
          <div className={classes.isEmpty}>
            <span className={classes.isEmptyText}>
              Please log in to view your basket
            </span>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button isActive onClick={() => handleLoginClick(true)}>
                Log In
              </Button>
              <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
            </div>
          </div>
        ) : basketItems.length === 0 ? (
          <div className={classes.isEmpty}>
            <span className={classes.isEmptyText}>Basket is empty</span>
            <Link to="/categories" style={{ textDecoration: "none" }}>
              <Button isActive iconName="right">
                Let's have some joy!
              </Button>
            </Link>
          </div>
        ) : (

          <div className={classes.mainContent}>
            {basketItems.length === 0 && user ? (
              <p>Your basket is empty.</p>
            ) : (
              basketItems.map((item) => (
                <Product key={item.id} item={item.product} />
              ))
            )}
            <div className={classes.basketSummary}>
              <span><strong>Total: </strong>  {basketItems.length}</span>
              <Button isActive>Proceed to Checkout</Button>
            </div>
          </div>

        )}
      </div>
      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)} />
      )}
    </Page>
  );
};

export default Basket;
