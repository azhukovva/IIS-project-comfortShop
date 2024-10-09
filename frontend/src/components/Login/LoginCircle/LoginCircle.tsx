import React from "react";

import classes from "./LoginCircle.module.css";
import { Icon } from "@iconify/react";
import icons from "../../../utils/icons";

type PropsType = {
  isGuest: boolean;
  userName?: string;
};

const LoginCircle = ({ isGuest, userName }: PropsType) => {
  const firstLetter = userName ? userName[0].toUpperCase() : "";

  return (
    <div className={classes.loginContainer}>
      {isGuest ? (
        <div className={classes.circle}>
          <Icon icon={icons.guest} />
        </div>
      ) : (
        <div className={classes.circle}>{firstLetter}</div>
      )}
    </div>
  );
};

export default LoginCircle;
