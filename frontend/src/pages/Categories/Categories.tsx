import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page/Page";

import classes from "./Categories.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import { images, productImages } from "../../utils/images";
import { Context } from "../../utils/Context";
import { CategoryType, get } from "../../utils/axios";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import PhotoCard from "../../components/PhotoCard/PhotoCard";

// Photos for PhotoCard
const photos = [];

const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { handleAddNewItem, handleAddNewCategory, isAddNewCategoryClicked, user } =
    useContext(Context);

  const fetchCategories = async () => {
    try {
      const response = await get("api/categories"); // Use the get method from the configured Axios instance
      setCategories(response.data);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  console.log("CURRENTUSER", user)

  useEffect(() => {
    fetchCategories();
  }, [handleAddNewCategory]);

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
                From plush blankets and ambient lighting to delightful scents
                and decor that calms body and mind
              </div>
              <div className={classes.btnContainer}>
                <Link
                  to="/categories/home"
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

        <section className={classes.container} id="categories">
          <div className={classes.sectionTitle}>Shop By Category</div>
          <div className={classes.sectionContainer}>
            {categories?.map(
              (category) =>
                !category.parent && (
                  <CategoryCard
                    key={category.slug}
                    title={category.name}
                    link={`/categories/${category.name}+${category.slug}`}
                    image={category.image ?? images.home}
                  />
                )
            )}
            {/* <CategoryCard
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
            /> */}
          </div>
        </section>

        <section className={classes.container}>
          <div>
            <div className={classes.sectionTitle}>You & Comfort Store</div>
            <div className={classes.sectionDescription}>
              <span
                style={{
                  marginBottom: "3rem",
                  borderBottom: ".6px solid rgba(0, 0, 0, 0.3)",
                  paddingBottom: "1rem",
                }}
              >
                <span className={classes.cursive}>Our</span> products in{" "}
                <span className={classes.cursive}>your</span> life
              </span>
              From cherished corners to favorite moments,
              <br />
              <span>
                explore snapshots shared by our community, showcasing their
                comfort spaces.
              </span>
            </div>
          </div>

          <div className={classes.sectionContainer}>
            <PhotoCard
              photo={productImages.dishFruit}
              productLink=""
              nickname="aryna"
            />
            <PhotoCard
              photo={productImages.plant1}
              productLink=""
              nickname="natasha"
            />
            <PhotoCard
              photo={productImages.hairCare}
              productLink=""
              nickname="oleh"
            />
            <PhotoCard
              photo={productImages.dishFlower}
              productLink=""
              nickname="misha"
            />
            <PhotoCard
              photo={productImages.desk}
              productLink=""
              nickname="alisa"
            />
          </div>
        </section>


      </div>
    </Page>
  );
};

export default Categories;
