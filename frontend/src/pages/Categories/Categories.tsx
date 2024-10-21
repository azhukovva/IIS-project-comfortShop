import React, { useContext } from "react";
import Page from "../../components/Page/Page";

import classes from "./Categories.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import images from "../../utils/images";
import AddCategory from "./AddCategory/AddCategory";
import AddNewItem from "../../components/Item/AddNewItem/AddNewItem";
import { Context } from "../../utils/Context";

const Categories = () => {
  const { handleAddNewItem } = useContext(Context);
  return (
    <Page title="Categories" isHeader>
      <div className={classes.categoriesContainer}>
        <CategoryCard
          title="Home&Cozyness"
          image={images.home}
          link="/categories/home"
        />
        <CategoryCard
          title="Hobby"
          image={images.hobby}
          link="/categories/home"
        />
        <CategoryCard
          title="Sweets"
          image={images.sweets}
          link="/categories/sweets"
        />
        <CategoryCard
          title="Beauty&Care"
          image={images.beauty}
          link="/categories/home"
        />
        <AddCategory />
        <AddNewItem onClick={() => handleAddNewItem(true)} />
      </div>
    </Page>
  );
};

export default Categories;
