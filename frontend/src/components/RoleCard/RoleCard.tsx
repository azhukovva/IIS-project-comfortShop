import React from "react";
import classes from "./RoleCard.module.css";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";

type PropsType = {
  title: string;
  description: string;
  icon: icons;
  page: string;
};

const RoleCard = ({ title, description, icon, page }: PropsType) => {
  return (
    <Link to={page} style={{textDecoration: "none", color: "black"}}>
    <div className={classes.cardContainer}>
      <Icon icon={icon} width={48} />
      <div className={classes.textContainer}>
        <p className={classes.descriptionContainer}>{description}</p>
        <h2 className={classes.titleContainer}>{title}</h2>
      </div>
    </div>
    </Link>
  );
};

export default RoleCard;
