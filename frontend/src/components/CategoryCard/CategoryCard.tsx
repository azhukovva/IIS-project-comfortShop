import React from "react";

import classes from "./CategoryCard.module.css";

type PropsType = {
  title: string;
  image: string;
};

const CategoryCard = ({ title, image }: PropsType) => {
  return (
    <div
      className={classes.cardContainer}
      style={{ backgroundImage: `url(${image})` }} 
    >
      <div className={classes.cardOverlay}>
        <h2 className={classes.title}>{title}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
