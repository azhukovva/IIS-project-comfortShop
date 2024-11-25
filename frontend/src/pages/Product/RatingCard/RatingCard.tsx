import React from "react";

import classes from "./RatingCard.module.css";
import { PostType, RatingType } from "../../../utils/axios";

type RatingCardProps = {
  post: PostType;
};

const RatingCard = ({ post }: RatingCardProps) => {
  console.log(post);
  return (
    <div className={classes.ratingCard}>
      <h3 className={classes.header}>{post.title || "Untitled Post"}</h3>
      <p className={classes.text}>{post.text}</p>
      <div className={classes.ratingInfo}>{post.rating}</div>
    </div>
  );
};

export default RatingCard;
