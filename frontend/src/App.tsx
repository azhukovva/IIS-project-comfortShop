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

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/home" element={<Home />} />
        <Route path="/categories/hobby" element={<Hobby />} />
        <Route path="/categories/sweets" element={<Sweets />} />
        <Route path="/categories/beauty" element={<Beauty />} />
      </Routes>
    </Container>
  );
};

export default App;
