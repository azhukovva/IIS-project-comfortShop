import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome/Welcome";
import Container from "./components/Container/Container";
import Categories from "./pages/Categories/Categories";
import Basket from "./pages/Basket/Basket";
import Product from "./components/Item/Product";
import Items from "./pages/Items/Items";
import Category from "./pages/Categories/Category/Category";
import ScrollToTop from "./hooks/ScrollToTop";
import Subcategory from "./pages/Categories/Subcategory/Subcategory";
import ProductPage from "./pages/Product/ProductPage";
import Users from "./pages/Users/Users";

const App = () => {
  return (
    <Container>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/users" element={<Users />} />

        <Route path="/basket" element={<Basket />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/categories/:category" element={<Category />} />

        {/* <Route path="/categories/home-cozyness" element={<Home />} />
        <Route path="/categories/hobby-leisure" element={<Hobby />} />
        <Route path="/categories/sweets" element={<Sweets />} />
        <Route path="/categories/beauty-care" element={<Beauty />} /> */}

        <Route path="/categories/:category/:subcategory" element={<Subcategory />} />

        <Route path="/categories/:category/product/:id" element={<ProductPage />} />

      </Routes>
    </Container>
  );
};

export default App;
