import React from "react";
import { Link } from "react-router-dom";
import classes from "./Sidebar.module.css";

interface FilterProps {
  categories: string[];
  onFilterChange: (category: string) => void;
}

const Sidebar: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  return (
    <div className={classes.sidebar}>
      <h3 className={classes.filterTitle}>Filters</h3>
      <ul className={classes.categoryList}>
        {categories.map((category, index) => (
          <li key={index} onClick={() => onFilterChange(category)}>
            <div className={classes.categoryItem}>{category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
