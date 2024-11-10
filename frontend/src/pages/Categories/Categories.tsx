import React, { useContext } from "react";
import Page from "../../components/Page/Page";

import classes from "./Categories.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import images from "../../utils/images";
import { Context } from "../../utils/Context";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Categories = () => {
  const { handleAddNewItem, handleAddNewCategory, isAddNewCategoryClicked } =
    useContext(Context);
  console.log(isAddNewCategoryClicked);
  return (
    <Page isHeader>
      <div className={classes.categoriesContainer}>
        <section className={classes.content}>
          <div className={classes.mainTextContainer}>
            <span style={{ fontFamily: "League Script", fontSize: "50px" }}>
              Comfort Heaven
            </span>
            <span>
              Discover a world of cozy, comforting essentials designed to make
              every corner of your home a sanctuary.
              <div>
                {" "}
                From plush blankets and ambient lighting to delightful scents
                and decor that calms body and mind
              </div>
              <div className={classes.btnContainer}>
                <Link
                  to="/categories/home-cozyness"
                  style={{ textDecoration: "none" }}
                >
                  <Button isActive>Discover cozyness</Button>
                </Link>
              </div>
            </span>
          </div>
          <div
            className={classes.mainImageContainer}
            style={{ backgroundImage: `url(${images.main})` }}
          ></div>
        </section>
        <section className={classes.container}>
          <div className={classes.sectionTitle}>Shop By Category</div>
          <div className={classes.sectionContainer}>
            <CategoryCard
              title="Home & Cozyness"
              link="/categories/home-cozyness"
              image={images.home}
            />
            <CategoryCard
              title="Hobby & Leisure"
              link="/categories/hobby-leisure"
              image={images.hobby}
            />
            <CategoryCard
              title="Sweets"
              link="/categories/sweets"
              image={images.sweets}
            />
            <CategoryCard
              title="Beauty & Care"
              link="/categories/beauty-care"
              image={images.beauty}
            />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Categories;
