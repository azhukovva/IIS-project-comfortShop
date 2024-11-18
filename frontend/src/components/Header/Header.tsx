import React, { useContext, useEffect, useState } from "react";

import classes from "./Header.module.css";

import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../utils/Context";

const Header = () => {
  const [activeAction, setActiveAction] = useState("buy");
  const [activeCategory, setActiveCategory] = useState("all");

  const location = useLocation();

  const navigate = useNavigate();
  const { handleLoginClick, handleSelling, isAuth } = useContext(Context);

  const handleSellClick = () => {
    handleSelling(true);
    setActiveAction("sell");

    if (!isAuth) {
      handleLoginClick();
      setActiveAction("buy");
    }
  };

  useEffect(() => {
    if (location.pathname === "/categories") {
      setActiveCategory("all");
    } else if (location.pathname === "/categories/home-cozyness") {
      setActiveCategory("home");
    } else if (location.pathname === "/categories/hobby-leisure") {
      setActiveCategory("hobby");
    } else if (location.pathname === "/categories/sweets") {
      setActiveCategory("sweets");
    } else if (location.pathname === "/categories/beauty-care") {
      setActiveCategory("beauty");
    }
  });

  return (
    <header className={classes.header}>
      <div className={classes.actionsContainer}>
        <Button
          onClick={() => setActiveAction("buy")}
          isActive={activeAction === "buy"}
        >
          Buy
        </Button>
        <Button
          onClick={() => handleSellClick()}
          isActive={activeAction === "sell"}
        >
          Sell
        </Button>
      </div>
      <div className={classes.title} onClick={() => navigate("/categories")}>
        Comfort Store
      </div>
      <div className={classes.rightSideContainer}>
        <Link to="/account" style={{ textDecoration: "none" }}>
          <Button>Account</Button>
        </Link>
        <Link to="/basket" style={{ textDecoration: "none" }}>
          <Button iconName="basket">My Basket</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
