import React from "react";

import classes from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

type PropsType = {
  title: string;
  image: string;
  link: string;
};

const CategoryCard = ({ title, link, image }: PropsType) => {
  return (
    // <div className={classes.cardContainer} style={{ backgroundImage: `url(${image})` }}>
    <div className={classes.cardContainer} >
    <Link to={link} className={classes.cardLink}>
      <div className={classes.cardOverlay}>
        <h2 className={classes.cardTitle}>{title}</h2>
      </div>
    </Link>
  </div>
  
  );
};


export default CategoryCard;
