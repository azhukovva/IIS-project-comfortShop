import React, { useContext, useEffect, useState } from "react";

import classes from "./Header.module.css";

import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginCircle from "../Login/LoginCircle/LoginCircle";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
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
    {
      !isAuth && handleLoginClick();
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
      <div className={classes.title} onClick={() => navigate("/")}>Comfort Store</div>
      <div className={classes.rightSideContainer}>
      <Link to="/basket" style={{ textDecoration: "none" }}>
          <Button>Account</Button>
        </Link>
        <Link to="/basket" style={{ textDecoration: "none" }}>
          <Button iconName="basket">My Basket</Button>
        </Link>
     
      </div>
      {/* Categories */}
      {/* <div className={classes.rightSideContainer}>
        <div className={classes.categoriesContainer}>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "all"}>All Categories</Button>
          </Link>

          <Link to="/categories/home&Cozyness" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "home"}>Home&Cozyness</Button>
          </Link>

          <Link to="/categories/hobby&Leisure" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "hobby"}>Hobby</Button>
          </Link>

          <Link to="/categories/sweets" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "sweets"}>
              Sweets&Pastries
            </Button>
          </Link>

          <Link to="/categories/beauty&Care" style={{ textDecoration: "none" }}>
            <Button isActive={activeCategory === "beauty"}>Beauty&Care</Button>
          </Link>

          <Link to="/basket" style={{ textDecoration: "none" }}>
            <Button iconName="basket">
              My Basket
            </Button>
          </Link>

          <Button onClick={handleLoginClick}>
            {isAuth ? (
              <Icon icon={icons.user} />
            ) : (
              <Icon icon={icons.guest} width={24} />
            )}
          </Button>
        </div>
      </div> */}

    </header>
  );
};

export default Header;
