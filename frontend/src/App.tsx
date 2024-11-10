import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome/Welcome";
import Container from "./components/Container/Container";
import Categories from "./pages/Categories/Categories";
import Home from "./pages/Home/Home";
import Hobby from "./pages/Hobby/Hobby";
import Sweets from "./pages/Sweets/Sweets";
import Beauty from "./pages/BeautyAndCare/Beauty";
import Basket from "./pages/Basket/Basket";
import Product from "./components/Item/Product";
import Items from "./pages/Items/Items";
import Category from "./components/Category/Category";
import ScrollToTop from "./hooks/ScrollToTop";

const App = () => {
  return (
    <Container>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/categories/:category" element={<Category />} />

        {/* <Route path="/categories/home-cozyness" element={<Home />} />
        <Route path="/categories/hobby-leisure" element={<Hobby />} />
        <Route path="/categories/sweets" element={<Sweets />} />
        <Route path="/categories/beauty-care" element={<Beauty />} /> */}

        <Route path="/categories/:category/:subcategory" element={<Items />} />
      </Routes>
    </Container>
  );
};

export default App;
