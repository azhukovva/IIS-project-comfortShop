import React, { useContext, useState } from "react";
import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";

import classes from "./Basket.module.css";
import { Link } from "react-router-dom";
import { axiosAuth, BasketProductType } from "../../utils/axios";
import Product from "../../components/Item/Product";
import { Context } from "../../utils/Context";

const Basket = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [basketItems, setBasketItems] = useState<BasketProductType[]>([]);

  const {handleIsAuth} = useContext(Context)

  const getBasketItems = async (id: string) => {
    try {
      const response = axiosAuth.get(`/api/baskets/${id}`);
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
    <Page title="My basket" isBasketPage isHeader>
      <div className={classes.basketContentContainer}>
        {basketItems.length === 0 ? (
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
            {basketItems.length === 0 ? (
              <p>Your basket is empty.</p>
            ) : (
              basketItems.map((item) => (
                <Product key={item.id} item={item.product} />
              ))
            )}
            <div className={classes.basketSummary}>
              <span>Total: </span>
              <Button isActive>Proceed to Checkout</Button>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Basket;
