import React, { ChangeEventHandler } from "react";

import classes from "./Input.module.css";
import InputContainer from "../InputContainer/InputContainer";

type InputProps = {
  name?: string;
  value?: string;
  labelText: string;
  placeholder?: string;
  isRequired: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  name = "",
  labelText = "",
  value = "",
  placeholder = "",
  isRequired = false,
  onChange = () => {},
}: InputProps) => {
  return (
    <InputContainer labelText={labelText} isRequired={isRequired}>
      <input
        name={name}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className={classes.input}
      />
    </InputContainer>
  );
};

export default Input;
