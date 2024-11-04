import React from "react";
import Page from "../../components/Page/Page";

import classes from "./Home.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import images from "../../utils/images";
import AddCategory from "../Categories/AddCategory/AddCategory";

const Home = () => {
  return (
    <Page title="Home&Cozyness" isHeader isNavigation>
      <div className={classes.categoriesContainer}>
        <CategoryCard
          title="Plants"
          image={images.plants}
          link="/categories/home&Cozyness/Plants"
        />
        <CategoryCard
          title="Scent&Ambience"
          image={images.candles}
          link="/categories/home&Cozyness/Scent&Ambience"
        />
      </div>
    </Page>
  );
};

export default Home;
