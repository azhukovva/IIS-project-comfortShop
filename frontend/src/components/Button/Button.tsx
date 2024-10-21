import React, { MouseEventHandler, forwardRef } from "react";
import classes from "./Button.module.css";
import classNames from "classnames";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";

type ButtonProps = {
  children: React.ReactNode;
  className?: string; // only for buttonStyles classNames feature
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  isOnMouse?: boolean;
  iconName?: keyof typeof icons;
};

/*
 * ForwardRef allows direct DOM manipulation.
 * Is used to forward a ref from a parent component to a child component
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children = null,
      className = "",
      onClick = (e) => {},
      isActive = false,
      isOnMouse = false,
      iconName,
    },
    ref
  ) => {
    const buttonStyles = classNames(classes.container, className, {
      [classes.active]: isActive,
      [classes.isOnMouse]: isOnMouse,
    });

    return (
      <button ref={ref} onClick={onClick} className={buttonStyles}>
        {children}
        {iconName && (
          <Icon icon={icons[iconName]} style={{ marginLeft: ".5rem" }} />
        )}
      </button>
    );
  }
);

export default Button;
