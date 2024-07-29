import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import DashboardLayout from "../layouts/DashboardLayout";
import AddMovie from "../pages/Dashboard/AddMovie/AddMovie";
import ManageMovie from "../pages/Dashboard/ManageMovie/ManageMovie";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import DashboardMovieDetails from "../pages/Dashboard/MovieDetails/MovieDetails";
import EditMovie from "../pages/Dashboard/EditMovie/EditMovie";
import Movies from "../pages/Movies/Movies";
import ProtectedRoute from "./ProtectedRoute";
import ManageFeatured from "../pages/Dashboard/ManageFeatured/ManageFeatured";
import AdminRoute from "./AdminRoute";

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
        path: "/movies/:id",
        element: <MovieDetails />,
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
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // ---------User Dashboard Routes---------
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
        element: <DashboardMovieDetails />,
      },
      {
        path: "manage-movie/edit/:id",
        element: <EditMovie />,
      },
      // ------------Admin Dashboard Routes----------
      {
        path: "manage-featured",
        element: (
          <AdminRoute>
            <ManageFeatured />{" "}
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
