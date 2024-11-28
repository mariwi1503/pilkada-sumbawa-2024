import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChartComponent from "./ChartComponent.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import ErrorPage from "./ErrorPage.jsx";
import ChartGubernurComponent from "./ChartGubernurComponent.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "bupati",
    element: <ChartComponent />,
  },
  {
    path: "gubernur",
    element: <ChartGubernurComponent />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
