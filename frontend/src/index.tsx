import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./utils/Context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
); // can be "!" instead of "as HTMLElement"

root.render(
  <BrowserRouter>
    <ContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ContextProvider>
  </BrowserRouter>
);
