import React, { FC } from "react";
import { Link } from "react-router-dom";

import classes from "./Breadcrumbs.module.css";

type BreadcrumbItem = {
  title: string;
  url: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className={classes.breadcrumb}>
        {items.map((item, index) => (
          <li key={index} className={classes.breadcrumbItem}>
            {index < items.length - 1 ? ( // If not the last item, render as a link
              <Link to={item.url}>{item.title}</Link>
            ) : (
              <span>{item.title}</span> // Last item -> isn't a link
            )}
            {index < items.length - 1 && " > "}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;