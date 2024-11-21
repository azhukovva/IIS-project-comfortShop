import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Sidebar from "../../../components/Sidebar/Sidebar";
import classes from "./Category.module.css";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import useBreadcrumb from "../../../hooks/UseBreadcrumb";
import Product from "../../../components/Item/Product";

import { images } from "../../../utils/images";

import {
  axiosAuth,
  CategoryType,
  get,
  ProductType,
  request,
} from "../../../utils/axios";

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
  let categoryName = "";
  let categoryId = "";

  if (category) {
    const parts = category.split("+");

    // Debugging the split parts
    console.log("Split parts:", parts);

    // Ensure there are exactly 2 parts
    if (parts.length === 2) {
      [categoryName, categoryId] = parts;
    } else {
      // Log if the split didn't work as expected
      console.warn(
        "Unexpected category format. Expected 'name+id'. Received:",
        category
      );
    }
  }

  const navigate = useNavigate();
  const breadcrumbItems = useBreadcrumb();

  // State to store the subcategories
  const [subCategories, setSubCategories] = useState<CategoryType[]>([]);
  const [subcategoriesNames, setSubcategoriesNames] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [products, setProducts] = useState<ProductType[]>([]);

  const fetch = async (categoryId: string) => {
    try {
      const response = await get(`/api/categories/${categoryId}/products`); // products
      console.log("Response:", response.data);
      setProducts(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed to fetch subcategories:",
          (error as any).response?.data || error.message
        );
      } else {
        console.error("Failed to fetch subcategories:", error);
      }
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const response = await get(`/api/categories/${categoryId}/children/`);
      console.log("Response:", response.data);
      setSubCategories(response.data);
      setSubcategoriesNames(
        response.data.map((category: CategoryType) => category.name)
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed to fetch subcategories:",
          (error as any).response?.data || error.message
        );
      } else {
        console.error("Failed to fetch subcategories:", error);
      }
    }
  };

  const addSubcategory = async (categoryId: string) => {
    try {
      const response = await axiosAuth.post(`/api/categories/${categoryId}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed to fetch subcategories:",
          (error as any).response?.data || error.message
        );
      } else {
        console.error("Failed to fetch subcategories:", error);
      }
    }
  };

  useEffect(() => {
    if (categoryId) {
      category && setActiveCategory(category);
      fetch(categoryId); // all products
      fetchSubcategories(categoryId); // subcategories
      console.log("Category:", category);
    }
  }, [category]);

  console.log("Products:", products);
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
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map((product) => (
                <Link
                  to={`/categories/${category}/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                  key={product.id} // Add a unique key prop
                >
                  <Product item={product} isNotInBasket />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
