import React from "react";

import classes from "./InputContainer.module.css";

type PropsType = {
  children: React.ReactNode;
  labelText: string;
  hintText?: string;
  isRequired: boolean;
};

const InputContainer = ({
  children,
  labelText = "",
  hintText = "",
  isRequired = false,
}: PropsType) => {
  return (
    <div className={classes.container}>
      <label htmlFor={classes.input} className={classes.label}>
        {labelText}
        {isRequired && <span className={classes.required}>*</span>}
      </label>

      <div style={{position: "relative"}}>{children}</div>
    </div>
  );
};

export default InputContainer;
