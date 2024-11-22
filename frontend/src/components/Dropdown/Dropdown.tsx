import React, { useState } from "react";

import classes from "./Dropdown.module.css";
import Button from "../Button/Button";
import InputContainer from "../InputContainer/InputContainer";

type DropdownProps = {
  options: string[];
  labelText: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const Dropdown = ({
  options,
  placeholder,
  labelText,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };
  return (
    <div className={classes.dropdown}>
      <InputContainer labelText={labelText} isRequired>
        <Button onClick={handleToggle} iconName={isOpen ? "up" : "down"}>
          {selectedOption ? selectedOption : placeholder}
        </Button>
        {isOpen && (
          <ul className={classes.dropdownMenu}>
            {options.map((option) => (
              <li
                key={option}
                className={classes.dropdownItem}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </InputContainer>
    </div>
  );
};

export default Dropdown;
