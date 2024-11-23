import React, { useContext, useEffect, useState } from "react";

import classes from "./Header.module.css";

import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../utils/Context";
import SignInModal from "../Modal/SignInModal/SignInModal";

const Header = () => {
  const [activeAction, setActiveAction] = useState("buy");
  const [activeCategory, setActiveCategory] = useState("all");

  const [isSighIn, setIsSignIn] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();
  const {
    handleLoginClick,
    handleLogoutClick,
    handleSelling,
    isAuth,
    handleIsAuth,
    setToken,
    token
  } = useContext(Context);

  const handleSellClick = () => {
    handleSelling(true);
    setActiveAction("sell");

    if (!isAuth) {
      handleLoginClick();
      setActiveAction("buy");
    }
  };

  const handleAccountClick = () => {
    console.log("isAuth", isAuth);
    
    console.log("TOKEN:", token);
    if (isAuth === false) {
      setToken(null);
      handleLoginClick(true);
    } else {
      handleLogoutClick(true);
      console.log(isAuth);
    }
  };

  const handleSignIn = async () => {
    setIsSignIn(true);
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

        {/* Registration create user */}
        {isAuth == false && <Button onClick={() => setIsSignIn(true)}>Sign In</Button>}
         {/* Login */}
         <Button onClick={() => handleAccountClick()} isActive>
          {isAuth === false ? "Log in" : "Log out"}
        </Button>

        <Link to="/basket" style={{ textDecoration: "none" }}>
          <Button iconName="basket">My Basket</Button>
        </Link>
      </div>
      {isSighIn && <SignInModal onClose={() => setIsSignIn(false)}/>}
    </header>
  );
};

export default Header;
