import { useState } from "react";
import HomePage from "./pages/Home/Home";
import "./App.css";
import Navigation from "./pages/Navigation/Navigation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/loginPage";
import RegistrationPage from "./pages/Registration/registrationPage";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navigation></Navigation>
    </BrowserRouter>
  );
}

export default App;
