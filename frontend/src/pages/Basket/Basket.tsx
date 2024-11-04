import React, { useState } from "react";
import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";

import classes from "./Basket.module.css";
import { Link } from "react-router-dom";

const Basket = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  return (
    <Page title="My basket">
      <div className={classes.basketContentContainer}>
        {/* //REVIEW - need it? */}
        {/* <div className={classes.topRow}>
          <Link
            to="/categories"
            style={{ textDecoration: "none", width: "fit-content" }}
          >
            <Button iconName="left">Back to Store</Button>
          </Link>
        </div> */}
        {isEmpty ? (
          <div className={classes.isEmpty}>
            <span className={classes.isEmptyText}>Basket is empty</span>
            <Link to="/categories" style={{ textDecoration: "none" }}>
              <Button isAttention isActive iconName="right">
                Let's have some joy!
              </Button>
            </Link>
          </div>
        ) : (
          <div className={classes.mainContent}>
            <div className={classes.basketSummary}>
              <span>Total: </span>
              <Button isAttention isActive>
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
