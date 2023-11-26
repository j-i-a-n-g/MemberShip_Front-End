import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
const Login = React.lazy(() => import("@/view/Login/Login.jsx"));
const Home = React.lazy(() => import("@/view/Home/Home.jsx"));
const Person = React.lazy(() => import("@/view/Home/Person/Person.jsx"));
export default createBrowserRouter([
  {
    path: "/",
    element: <Suspense><Login /></Suspense>
  },
  {
    path: "/home",
    element: <Suspense><Home /></Suspense>,
    children: [
      {
        path: 'person',
        element: <Suspense><Person /></Suspense>,
      }
    ]
  }
])