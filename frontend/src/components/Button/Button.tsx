import React, { MouseEventHandler, forwardRef } from "react";
import classes from "./Button.module.css";
import classNames from "classnames";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string; // only for buttonStyles classNames feature
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  isOnMouse?: boolean;
  isAttention?: boolean;
  isOnAdd?: boolean;
  isBack?: boolean;
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
      type = "button",
      className = "",
      onClick = (e) => {},
      isActive = false,
      isOnMouse = false,
      isAttention = false,
      isOnAdd = false,
      isBack = false,
      iconName,
    },
    ref
  ) => {
    const buttonStyles = classNames(classes.container, className, {
      [classes.active]: isActive,
      [classes.isOnMouse]: isOnMouse,
      [classes.basket]: iconName === "basket",
      [classes.isAttention]: isAttention,
      [classes.isOnAdd]: isOnAdd,
      [classes.isBack]: isBack,
    });

    return (
      <button ref={ref} onClick={onClick} className={buttonStyles} type={type}>
        {children}
        {iconName && (
          <Icon icon={icons[iconName]} style={{ marginLeft: ".5rem" }} />
        )}
      </button>
    );
  }
);

export default Button;
