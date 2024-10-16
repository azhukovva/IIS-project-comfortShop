import { FloatingPortal } from "@floating-ui/react";
import React, { MouseEventHandler, useContext } from "react";

import classes from "./Modal.module.css";

import { Context, floatingRoot } from "../../utils/Context";
import Button from "../Button/Button";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";

type PropsType = {
  title: string;
  children: React.ReactNode;
  textOk: string;
  textCancel: string;
  onClose: () => void;
  onSubmit: () => void;
};

/*
 * Prevents click event
 */
const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
  e.stopPropagation();
};

const Modal = ({
  title,
  children,
  textOk,
  textCancel,
  onClose,
  onSubmit,
}: PropsType) => {
    const {handleLoginClick} = useContext(Context);
  return (
    <FloatingPortal root={floatingRoot}>
      <div className={classes.outer}>
        <div onClick={stopPropagation}>
          <header>
            <div className={classes.headerTitle}>
              <Icon icon={icons.user} height={25} width={25} />
              {title}
            </div>
            <button onClick={handleLoginClick}>
              <Icon icon={icons.add} height={25} width={25} />
            </button>
          </header>
          <div className={classes.content}>{children}</div>
          <footer className={classes.footer}>
            <div className={classes.actions}>
              <Button onClick={onClose}>{textCancel}</Button>
              <Button onClick={onSubmit}>{textOk}</Button>
            </div>
          </footer>
        </div>
      </div>
    </FloatingPortal>
  );
};

export default Modal;
