import React, { ChangeEventHandler } from "react";

import classes from "./Input.module.css";
import InputContainer from "../InputContainer/InputContainer";

type InputProps = {
  name?: string;
  value?: string;
  labelText: string;
  placeholder?: string;
  isRequired: boolean;
  isBig?: boolean;
  isSmall?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const Input = ({
  name = "",
  labelText = "",
  value = "",
  placeholder = "",
  isRequired = false,
  isBig = false,
  isSmall = false,
  onChange = () => {},
}: InputProps) => {
  const inputStyles = isBig
    ? classes.bigInput
    : isSmall
    ? classes.smallInput
    : classes.input;
  return (
    <InputContainer labelText={labelText} isRequired={isRequired}>
      {isBig ? (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={classes.bigInput}
        />
      ) : (
        <input
          name={name}
          value={value}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className={inputStyles}
        />
      )}
    </InputContainer>
  );
};

export default Input;
