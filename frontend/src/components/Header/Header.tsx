import React, { useContext, useEffect, useState } from "react";

import classes from "./Header.module.css";

import Button from "../Button/Button";
import { Link, useLocation } from "react-router-dom";
import LoginCircle from "../Login/LoginCircle/LoginCircle";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import { Context } from "../../utils/Context";

const Header = () => {
  const [activeAction, setActiveAction] = useState("buy");
  const [activeCategory, setActiveCategory] = useState("all");

  const location = useLocation();

  const { handleLoginClick, isLoginClicked} = useContext(Context)

  useEffect(() => {
    if (location.pathname === "/categories") {
      setActiveCategory("all");
    } else if (location.pathname === "/categories/home") {
      setActiveCategory("home");
    } else if (location.pathname === "/categories/hobby") {
      setActiveCategory("hobby");
    } else if (location.pathname === "/categories/sweets") {
      setActiveCategory("sweets");
    } else if (location.pathname === "/categories/beauty") {
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
          onClick={() => setActiveAction("sell")}
          isActive={activeAction === "sell"}
        >
          Sell
        </Button>
      </div>
      {/* Categories */}
      <div className={classes.rightSideContainer}>
        <div className={classes.categoriesContainer}>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "all"}>All Categories</Button>
          </Link>

          <Link to="/categories/home" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "home"}>Home&Cozyness</Button>
          </Link>

          <Link to="/categories/hobby" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "hobby"}>Hobby</Button>
          </Link>

          <Link to="/categories/sweets" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "sweets"}>
              Sweets&Pastries
            </Button>
          </Link>

          <Link to="/categories/beauty" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "beauty"}>Beauty&Care</Button>
          </Link>

          <Button onClick={handleLoginClick}> <Icon icon={icons.guest}/></Button>
        </div>
        <div>
          {/* <LoginCircle isGuest /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
