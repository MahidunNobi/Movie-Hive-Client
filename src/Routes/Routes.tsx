import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import DashboardLayout from "../layouts/DashboardLayout";
import AddMovie from "../pages/Dashboard/AddMovie/AddMovie";
import ManageMovie from "../pages/Dashboard/ManageMovie/ManageMovie";
import MovieDetails from "../pages/Dashboard/MovieDetails/MovieDetails";
import EditMovie from "../pages/Dashboard/EditMovie/EditMovie";
import Movies from "../pages/Movies/Movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "add-movie",
        element: <AddMovie />,
      },
      {
        path: "manage-movie",
        element: <ManageMovie />,
      },
      {
        path: "manage-movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "manage-movie/edit/:id",
        element: <EditMovie />,
      },
    ],
  },
]);

export default router;
