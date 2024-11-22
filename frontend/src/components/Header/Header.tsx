import React, { useContext, useEffect, useState } from "react";

import classes from "./Header.module.css";

import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../utils/Context";

const Header = () => {
  const [activeAction, setActiveAction] = useState("buy");
  const [activeCategory, setActiveCategory] = useState("all");

  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const location = useLocation();

  const navigate = useNavigate();
  const { handleLoginClick, handleLogoutClick, handleSelling, isAuth, handleIsAuth } = useContext(Context);

  const handleSellClick = () => {
    handleSelling(true);
    setActiveAction("sell");

    if (!isAuth) {
      handleLoginClick();
      setActiveAction("buy");
    }
  };

  const handleAccountClick = () => {
    console.log("isAuth", isAuth)
    console.log(localStorage.getItem("authToken"))
    if (isAuth === false){
      localStorage.setItem("authToken", "")
      handleLoginClick(true)
      console.log(isAuth, localStorage.getItem("authToken"))
    }
    else {
      handleLogoutClick(true)
      console.log(isAuth, localStorage.getItem("authToken"))
    }
  }

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

          <Button onClick={() => handleAccountClick()}>Account</Button>
    
        <Link to="/basket" style={{ textDecoration: "none" }}>
          <Button iconName="basket">My Basket</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
