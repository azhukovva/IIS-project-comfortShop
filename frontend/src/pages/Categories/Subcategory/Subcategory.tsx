import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBreadcrumb from "../../../hooks/UseBreadcrumb";

import classes from "./Subcategory.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { categoriesMap, products } from "../Category/Category";
import Product from "../../../components/Item/Product";

const Subcategory = () => {
  const { category, subcategory } = useParams<{
    category: string;
    subcategory: string;
  }>();
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const navigate = useNavigate();
  const breadcrumbItems = useBreadcrumb();

  // Fetch products for subcategory
  const fetchProducts = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    navigate(`/categories/${category}/${subcategory}`);
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  }

  useEffect(() => {
    if (category && categoriesMap[category]) {
      setSubCategories(categoriesMap[category]);
    } else {
      setSubCategories([]);
    }
  }, [category]);

  console.log("Subcategory:", subcategory); // Debugging

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Sidebar
          categories={subCategories}
          onFilterChange={handleSubcategoryClick}
        />

        {/* Category Content */}
        <div className={classes.categoryContent}>
          <Breadcrumbs items={breadcrumbItems} />
          <h2 className={classes.categoryHeading}>
            {subcategory && subcategory.replace("-", "&").toUpperCase()}
          </h2>

          <div className={classes.items}>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subcategory;
