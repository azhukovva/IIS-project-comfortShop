import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome/Welcome";
import Container from "./components/Container/Container";
import Categories from "./pages/Categories/Categories";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/home" element={<Home />} />
      </Routes>
    </Container>
  );
};

export default App;
