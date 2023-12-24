import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
const Login = React.lazy(() => import("@/view/Login/Login.jsx"));
const Main = React.lazy(() => import("@/view/Home/Main/Main.jsx"));
const Home = React.lazy(() => import("@/view/Home/Home.jsx"));
const Person = React.lazy(() => import("@/view/Home/Person/Person.jsx"));
const Topic = React.lazy(() => import("@/view/Home/Topic/Topic.jsx"));
const Root = React.lazy(() => import("@/view/Home/Root/Root.jsx"));
const Three = React.lazy(() => import("@/view/Three/Three.jsx"));
const Chris = React.lazy(() => import("@/view/Chris/Chris.jsx"));
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
        path: '',
        element: <Suspense><Main /></Suspense>,
      },
      {
        path: 'person',
        element: <Suspense><Person /></Suspense>,
      },
      {
        path: 'topic',
        element: <Suspense><Topic /></Suspense>,
      },
      {
        path: 'root',
        element: <Suspense><Root /></Suspense>,
      }
    ]
  },
  {
    path: 'three3D',
    element: <Suspense><Three /></Suspense>,
  },
  {
    path: 'chris',
    element: <Suspense><Chris /></Suspense>,
  },
])