import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

const appRoot = ReactDOM.createRoot(document.getElementById("app"));

appRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
