import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgetPassword from "./pages/forgot-password";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/reset-password";
import Layout from "./components/layout";
import HomePage from "./pages/home";
import Dashboard from "./component/dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgetPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard/club1",
          element: <div>Club</div>,
        },
        {
          path: "/dashboard/club2",
          element: <div>Club2</div>,
        },
        {
          path: "/dashboard/club3",
          element: <div>Club3</div>,
        },
        {
          path: "/dashboard/all-promotion",
          element: <div>All Promotion</div>,
        },
        {
          path: "/dashboard/profile",
          element: <div>Your Profile</div>,
        },
        {
          path: "/dashboard/overview",
          element: <div>Overview</div>,
        },
        {
          path: "/dashboard/manage",
          element: <div>Manage</div>,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
