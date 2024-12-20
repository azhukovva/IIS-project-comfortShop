import React, { act, useContext, useEffect, useState } from "react";
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
} from "../../../utils/axios";
import { Context } from "../../../utils/Context";

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
  const { token } = useContext(Context);

  // State to store the subcategories
  const [subCategories, setSubCategories] = useState<CategoryType[]>([]);
  const [subcategoriesNames, setSubcategoriesNames] = useState<string[]>([
    "All",
  ]);
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(
    null
  );

  const [products, setProducts] = useState<ProductType[]>([]);

  const fetch = async (categoryId: string) => {
    try {
      let response;
      if (activeCategory && activeCategory.name === "All") {
        response = await get(`/api/categories/${categoryId}/products`); // all products
      } else {
        const subcategory = subCategories.find(
          (sub) => sub.name === activeCategory?.name
        );
        response = await get(`/api/categories/${subcategory?.slug}/products/`);
      }
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
      setSubcategoriesNames([
        "All",
        ...response.data.map((category: CategoryType) => category.name),
      ]);
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
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.post(
        `/api/categories/${categoryId}`
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

  useEffect(() => {
    if (categoryId) {
      category &&
        setActiveCategory({
          name: categoryName,
          slug: categoryId,
          parent: "",
          children: [],
          image: "", // Provide a default or actual image URL if available
        });
      fetch(categoryId); // all products
      fetchSubcategories(categoryId); // subcategories
      console.log("Category:", category);
    }
  }, [category, categoryId]);

  useEffect(() => {
    if (activeCategory) {
      fetch(activeCategory.slug);
    }
  }, [activeCategory]);

  console.log("Products:", products);

  // const handleSubcategoryClick = (subcategory: string) => {
  //   // navigate(`/categories/${categoryName}+${categoryId}/${subcategory}`);
  //   setActiveCategory(subcategory);
  // };

  const handleSubcategoryClick = async (subcategoryName: string) => {
    const subcategory = subCategories.find(
      (sub) => sub.name === subcategoryName
    );
    if (subcategory) {
      setActiveCategory(subcategory);

      // Fetch products for the selected subcategory
      try {
        const response = await get(
          `/api/categories/${subcategory.slug}/products`
        );
        console.log("slug:", subcategory.slug);
        console.log("Subcategory Products:", response.data);
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            "Failed to fetch subcategory products:",
            (error as any).response?.data || error.message
          );
        } else {
          console.error("Failed to fetch subcategory products:", error);
        }
      }
    }
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
