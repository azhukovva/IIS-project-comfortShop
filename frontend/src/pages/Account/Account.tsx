import React from "react";
import Page from "../../components/Page/Page";

import classes from "./Account.module.css";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/categories");
    setTimeout(() => {
      const element = document.querySelector("#categories");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const user = {
    name: "John Smith",
    username: "johnsmith",
    address: "123 Main Street, Springfield, USA",
    basketItems: [
      //   { id: 1, name: "Product 1", quantity: 2 },
      //   { id: 2, name: "Product 2", quantity: 1 },
    ],
  };
  return (
    <Page title="My Account" isBasketPage>
      <div className={classes.contentContainer}>
        <div className={classes.section}>
          <h2>About me</h2>
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        </div>

        {/* Sekce Košíku */}
        <div className={classes.section}>
          <h2>Basket Items</h2>
          {user.basketItems.length > 0 ? (
            <div className={classes.cardsContainer}></div>
          ) : (
            // <ul>
            //   {user.basketItems.map((item) => (
            //     <li key={item.id}>
            //       {item.name} - Quantity: {item.quantity}
            //     </li>
            //   ))}
            // </ul>
            <div className={classes.basketText}>
              <p>Your basket is empty.</p>

              <Button isActive iconName="right" onClick={handleButtonClick}>
                Let's have some joy!
              </Button>
            </div>
          )}
        </div>
        <div className={classes.section} style={{ marginTop: "8rem" }}>
          <Button isActive>Log Out</Button>
        </div>
      </div>
    </Page>
  );
};

export default Account;
