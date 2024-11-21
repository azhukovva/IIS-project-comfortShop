import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Sidebar from "../../../components/Sidebar/Sidebar";
import classes from "./Category.module.css";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import useBreadcrumb from "../../../hooks/UseBreadcrumb";
import Product from "../../../components/Item/Product";

import { images } from "../../../utils/images";

import { CategoryType, ProductType, request } from "../../../utils/axios";

// export const products: ProductType[] = [
//   {
//     id: "1",
//     name: "Cozy Blanket",
//     description: "A soft and warm blanket to keep you cozy all day long.",
//     price: 29.99,
//     image: images.body,
//   },
//   {
//     id: "2",
//     name: "Scented Candle",
//     description: "Lavender scented candle for a calming atmosphere.",
//     price: 15.99,
//     image: images.cheesecake,
//   },
//   {
//     id: "3",
//     name: "Comfortable Pillow",
//     description: "A soft pillow for ultimate comfort and relaxation.",
//     price: 19.99,
//     image: images.lotus,
//   },
//   {
//     id: "4",
//     name: "Art Print",
//     description: "A beautiful art print to decorate your living room.",
//     price: 39.99,
//     image: images.beading,
//   },
//   {
//     id: "5",
//     name: "Decorative Vase",
//     description: "A stylish vase to add elegance to any room.",
//     price: 24.99,
//     image: images.face,
//   },
// ];

// Define the category-subcategory mapping
export const categoriesMap: Record<string, string[]> = {
  "home-cozyness": ["Plants", "Candles", "Blankets", "Decor"],
  "hobby-leisure": ["Books", "Board Games", "Sports Gear", "Art Supplies"],
  sweets: ["Chocolates", "Candies", "Gourmet Snacks"],
  "beauty-care": ["Skincare", "Makeup", "Hair Care", "Fragrances"],
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryName, categoryId] = category ? category.split("+") : ["", ""];

  const navigate = useNavigate();
  const breadcrumbItems = useBreadcrumb();

  // State to store the subcategories
  const [subCategories, setSubCategories] = useState<CategoryType[]>([]);
  const [subcategoriesNames, setSubcategoriesNames] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const fetchChildren = async () => {
    try {
      const response = await request.get.getSubcategories(categoryId);
      setSubCategories(response.data);

      setSubCategories(response.data);
      setSubcategoriesNames(
        response.data.map((category: CategoryType) => category.name)
      );
    } catch (error) {
      console.error("Failed to fetch children:", error);
    }
  };

  console.log("Subcategories:", subCategories); // Debugging
  console.log("Subcategories names:", subcategoriesNames); // Debugging

  // Check if category exists in the mapping
  useEffect(() => {
    if (categoryName && categoriesMap[categoryName]) {
      const transformedSubCategories: CategoryType[] = categoriesMap[
        categoryName
      ].map((name) => ({
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        parent: categoryName,
        children: [],
        image: "", // Provide a default image or fetch the image if available
      }));
      setSubCategories(transformedSubCategories);
    } else {
      fetchChildren();
    }
  }, [categoryName, categoryId]);

  const handleSubcategoryClick = (subcategory: string) => {
    navigate(`/categories/${categoryName}+${categoryId}/${subcategory}`);
    setActiveCategory(subcategory);
  };

  return (
    <div className={classes.container}>
      {/* Main content area */}
      <div className={classes.content}>
        <Sidebar
          categories={subcategoriesNames}
          onFilterChange={handleSubcategoryClick}
        />

        {/* Category Content */}
        <div className={classes.categoryContent}>
          <Breadcrumbs items={breadcrumbItems} />
          <h2 className={classes.categoryHeading}>
            {categoryName && categoryName.replace("-", "&").toUpperCase()}
          </h2>

          <div className={classes.items}>
            {/* {products.map((product) => (
              <Link
                to={`/categories/${category}/product/${product.id}`}
                key={product.id}
                style={{ textDecoration: "none" }}
              >
                <Product key={product.id} product={product} />
              </Link>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
