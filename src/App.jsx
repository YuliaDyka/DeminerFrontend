import { useState } from "react";
import HomePage from "./pages/Home/Home";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/loginPage";
import RegistrationPage from "./pages/Registration/registrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/loginpage",
    element: <LoginPage />,
  },
  {
    path: "/registrationpage",
    element: <RegistrationPage />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
