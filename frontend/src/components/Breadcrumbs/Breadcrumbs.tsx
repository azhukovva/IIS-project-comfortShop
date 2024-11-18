import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./Breadcrumbs.module.css";

type BreadcrumbItem = {
  title: string;
  url: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (url: string) => {
    if (url.startsWith("#")) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (url.includes("#")) {
      const [path, hash] = url.split("#");
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); 
    } else {
      navigate(url);
    }
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className={classes.breadcrumb}>
        {items.map((item, index) => (
          <li key={index} className={classes.breadcrumbItem}>

            {index < items.length - 1 ? ( // If not the last item, render as a link
              <Link to={item.url} onClick={() => handleBreadcrumbClick(item.url)}>{item.title}</Link>
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
