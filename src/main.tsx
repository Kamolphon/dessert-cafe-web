import React from 'react'
import App from './App'
import "./index.css";
import AllMenu from "./components/Menu/AllMenu"
import About from "./components/Views/About"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';


const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>
  },
  {
    path: "/allmenu",
    element:<AllMenu/>
  },
  {
    path: "/about",
    element:<About/>
  }
])

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Element with ID 'root' not found in the DOM.");
}