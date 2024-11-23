import React from "react";
import "./App.css";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
import ManagePanel from "./pages/ManagePanel/ManagePanel";
import AuthProvider, { useAuth } from "./utils/Authentification/AuthProvider";
import ProtectedRoute from "./utils/Authentification/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Container>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route path="/users" element={<ManagePanel />} />
          {/* <ProtectedRoute allowedRoles={["admin", "user"]}> */}
            <Route path="/basket" element={<Basket />} />
          {/* </ProtectedRoute> */}
          <Route path="/categories" element={<Categories />} />

          <Route path="/categories/:category" element={<Category />} />

          {/* <Route path="/categories/home-cozyness" element={<Home />} />
        <Route path="/categories/hobby-leisure" element={<Hobby />} />
        <Route path="/categories/sweets" element={<Sweets />} />
        <Route path="/categories/beauty-care" element={<Beauty />} /> */}

          <Route
            path="/categories/:category/:subcategory"
            element={<Subcategory />}
          />

          <Route
            path="/categories/:category/product/:id"
            element={<ProductPage />}
          />
        </Routes>
      </Container>
    </AuthProvider>
  );
};

export default App;
