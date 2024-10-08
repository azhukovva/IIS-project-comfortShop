import React from "react";
import Page from "../../components/Page/Page";

import classes from "./Home.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import images from "../../utils/images";

const Home = () => {
  return (
    <Page title="Home" isHeader isNavigation>
      <div className={classes.categoriesContainer}>
        <CategoryCard
          title="Plants"
          image={images.plants}
          link="/categories/home/plants"
        />
        <CategoryCard
          title="Scent&Ambience"
          image={images.candles}
          link="/categories/home/scent"
        />
      </div>
    </Page>
  );
};

export default Home;
