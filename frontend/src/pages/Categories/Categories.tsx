import React from "react";
import Page from "../../components/Page/Page";

import classes from "./Categories.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import images from "../../utils/images";

const Categories = () => {
  return (
    <Page title="Categories" isHeader>
      <div className={classes.categoriesContainer}>
        <CategoryCard title="Home&Cozyness" image={images.home}/>
        <CategoryCard title="Hobby" image={images.hobby}/>
        <CategoryCard title="Sweets" image={images.sweets}/>
        <CategoryCard title="Beauty&Care" image={images.beauty}/>
      </div>
    </Page>
  );
};

export default Categories;
