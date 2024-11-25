import React from "react";
import classes from "./StarRating.module.css";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const handleClick = (index: number) => {
    onChange(index + 1); // Stars are 1-indexed
  };

  return (
    <div className={classes.starRating}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={index < value ? classes.filledStar : classes.emptyStar}
          onClick={() => handleClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
