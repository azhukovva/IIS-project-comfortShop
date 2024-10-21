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
  comment?: string;
  iconName: keyof typeof icons;
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
  comment = "",
  iconName,
}: PropsType) => {
  return (
    <FloatingPortal root={floatingRoot}>
      <div className={classes.outer}>
        <div onClick={stopPropagation} className={classes.modalContainer}>
          <header className={classes.header}>
            <div className={classes.headerTitle}>
              <Icon icon={icons[iconName]} height={25} width={25} />
              {title}
            </div>
            <Icon
              icon={icons.close}
              height={25}
              width={25}
              onClick={onClose}
              style={{ cursor: "pointer" }}
            />
          </header>
          {comment && <span className={classes.comment}>{comment}</span>}
          <div className={classes.content}>{children}</div>
          <footer className={classes.footer}>
            <div className={classes.actions}>
              <Button onClick={onClose}>{textCancel}</Button>
              <Button onClick={onSubmit} isActive>
                {textOk}
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </FloatingPortal>
  );
};

export default Modal;
