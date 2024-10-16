import React, { ChangeEventHandler } from "react";

import classes from "./Input.module.css";

type InputProps = {
  labelText: string;
  value?: any;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  labelText,
  value,
  placeholder,
  onChange,
}: InputProps) => {
    //TODO - input container
  return <input type="text" value={value} placeholder={placeholder} onChange={onChange} className={classes.input}/>;
};

export default Input;
