import React from "react";

import classes from "./PhotoCard.module.css";
import { Link } from "react-router-dom";
import icons from "../../utils/icons";
import { Icon } from "@iconify/react";

type PropsType = {
  photo: string;
  productLink: string;
  nickname: string;
};

const PhotoCard = ({ photo, productLink, nickname }: PropsType) => {
  return (
    <div className={classes.cardContainer}>
      <div
        className={classes.photoContainer}
        style={{ backgroundImage: `url(${photo})` }}
      >
        {/* Link Icon */}
        <Link to={productLink} className={classes.linkIcon}>
          <Icon icon={icons.basket} />
        </Link>

      </div>
      <div className={classes.nickname}>from @{nickname}</div>
    </div>
  );
};

export default PhotoCard;
