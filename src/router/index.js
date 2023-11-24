import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
const Login = React.lazy(() => import("@/view/Login/Login.jsx"));
const Home = React.lazy(() => import("@/view/Home/Home.jsx"));
export default createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  }
])