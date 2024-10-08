import React from "react";

import classes from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

type PropsType = {
  title: string;
  image: string;
  link: string;
};

const CategoryCard = ({ title, image, link }: PropsType) => {
  return (

    <div
      className={classes.cardContainer}
      style={{ backgroundImage: `url(${image})` }} 
    >
      <Link to={link}>
      <div className={classes.cardOverlay}>
        <h2 className={classes.title}>{title}</h2>
      </div>
      </Link>
    </div>

  );
};

export default CategoryCard;
