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

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/home&Cozyness" element={<Home />} />
        <Route path="/categories/hobby&Leisure" element={<Hobby />} />
        <Route path="/categories/sweets" element={<Sweets />} />
        <Route path="/categories/beauty&Care" element={<Beauty />} />

        <Route path="/categories/:category/:subcategory" element={<Items />} />
      </Routes>
    </Container>
  );
};

export default App;
