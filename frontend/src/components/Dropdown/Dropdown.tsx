import React, { useState } from "react";

import classes from "./Dropdown.module.css";
import Button from "../Button/Button";
import InputContainer from "../InputContainer/InputContainer";

type DropdownProps = {
  options: string[];
  labelText: string;
  placeholder: string;
};

const Dropdown = ({ options, placeholder, labelText }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className={classes.dropdown}>
      <InputContainer labelText={labelText} isRequired>
        <Button
          onClick={handleToggle}
          iconName={isOpen ? "up" : "down"}
        >
          {selectedOption ? selectedOption : placeholder}
        </Button>
      </InputContainer>
      {isOpen && (
        <ul className={classes.dropdownMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={classes.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
