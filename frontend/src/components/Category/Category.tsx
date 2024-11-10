import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import classes from "./Category.module.css";
import Container from "../Container/Container";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import useBreadcrumb from "../../hooks/UseBreadcrumb";

// Define the category-subcategory mapping
const categoriesMap: Record<string, string[]> = {
  "home-cozyness": ["Plants", "Candles", "Blankets", "Decor"],
  "hobby-leisure": ["Books", "Board Games", "Sports Gear", "Art Supplies"],
  sweets: ["Chocolates", "Candies", "Gourmet Snacks"],
  "beauty-care": ["Skincare", "Makeup", "Hair Care", "Fragrances"],
};

const Category = () => {
  const { category } = useParams<{ category: string }>();

  console.log("Category:", category); // Debugging

  const navigate = useNavigate();
  const breadcrumbItems = useBreadcrumb();

  // State to store the subcategories
  const [subCategories, setSubCategories] = useState<string[]>([]);

  // Check if category exists in the mapping
  useEffect(() => {
    if (category && categoriesMap[category]) {
      setSubCategories(categoriesMap[category]);
    } else {
      setSubCategories([]);
    }
  }, [category]);

  const handleSubcategoryClick = (subcategory: string) => {
    navigate(`/categories/${category}/${subcategory}`);
  };

  return (
    <div className={classes.container}>
      {/* Main content area */}
      <div className={classes.content}>
        <Sidebar
          categories={subCategories}
          onFilterChange={handleSubcategoryClick}
        />

        {/* Category Content */}
        <div className={classes.categoryContent}>
          <Breadcrumbs items={breadcrumbItems} />
          <h2 className={classes.categoryHeading}>
            {category && category.replace("-", "&").toUpperCase()}
          </h2>

          <p>Display products for this category here...</p>
          <div className={classes.items}></div>
        </div>
      </div>
    </div>
  );
};

export default Category;
