import React, { MouseEventHandler, forwardRef } from "react";
import classes from "./Button.module.css";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  className?: string; // only for buttonStyles classNames feature
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  isOnMouse?: boolean;
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
      </button>
    );
  }
);

export default Button;
