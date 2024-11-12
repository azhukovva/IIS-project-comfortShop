import React, { useState } from "react";
import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";

import classes from "./Basket.module.css";
import { Link } from "react-router-dom";

const Basket = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  return (
    <Page title="My basket" isBasketPage isHeader>
      <div className={classes.basketContentContainer}>
        {isEmpty ? (
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
            <div className={classes.basketSummary}>
              <span>Total: </span>
              <Button isActive>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Basket;
