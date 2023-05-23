import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./header/Header";
import PrivateRoute from "./private-route";
import AuthenticationLayout from "./user-authroisation/AuthenticationLayout";
import CreateVbc from "./vbc-creation/CreateVbc";
import ReviewCreation from "./vbc-creation/review-creation/ReviewCreation";
import VbcCreation from "./vbc-creation/VbcCreation";
import FetchVbc from "./vbc-display/FetchVbc";

function App() {
  return (
    <div className="">
      <React.StrictMode>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" exact element={<AuthenticationLayout />} />
            <Route
              path="/create-vbc"
              exact
              element={<PrivateRoute route={<CreateVbc />} />}
            />
            <Route
              path="/vbc"
              exact
              element={<PrivateRoute route={<VbcCreation />} />}
            />
            <Route path="*" element={<PrivateRoute route={<CreateVbc />} />} />
            <Route path="vbc/:vbcId" element={<FetchVbc />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
