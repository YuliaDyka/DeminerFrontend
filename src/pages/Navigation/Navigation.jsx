import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "../Home/Home";
import LoginPage from "../Login/loginPage";
import RegistrationPage from "../Registration/registrationPage";
import Header from "../../components/Header/header";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("login")
  );
  console.log(localStorage.getItem("login") === null);

  return (
    <div>
      {isAuthenticated && <Header setAuth={setIsAuthenticated} />}
      <Routes>
        <Route
          element={
            <ProtectedRoute isAuth={isAuthenticated} redirect="/loginpage" />
          }
        >
          <Route path="/*" element={<Navigate to="/home" />} key="/*" />
          <Route path="/home" element={<HomePage />} key="/home" />
        </Route>
        <Route
          element={<ProtectedRoute isAuth={!isAuthenticated} redirect="/" />}
        >
          <Route
            path="/loginpage"
            element={<LoginPage setAuth={setIsAuthenticated} />}
            key="/loginpage"
          />
          <Route
            path="/registrationpage"
            element={<RegistrationPage setAuth={setIsAuthenticated} />}
            key="/registrationpage"
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Navigation;
