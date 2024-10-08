import React from "react";
import Page from "../../components/Page/Page";

import classes from "./Categories.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import images from "../../utils/images";
import AddCategory from "./AddCategory/AddCategory";

const Categories = () => {
  return (
    <Page title="Categories" isHeader>
      <div className={classes.categoriesContainer}>
        <CategoryCard title="Home&Cozyness" image={images.home} link="/categories/home"/>
        <CategoryCard title="Hobby" image={images.hobby} link="/categories/home"/>
        <CategoryCard title="Sweets" image={images.sweets} link="/categories/home"/>
        <CategoryCard title="Beauty&Care" image={images.beauty} link="/categories/home"/>
        <AddCategory />
      </div>
    </Page>
  );
};

export default Categories;
