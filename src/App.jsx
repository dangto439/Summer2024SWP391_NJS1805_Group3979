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
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import { Navigate } from "react-router-dom/dist";
import { toast } from "react-toastify";
// import { toast } from "react-toastify/dist";

function App() {
  const user = useSelector(selectUser);
  console.log(user);

  const AuthRoute = ({ children }) => {
    if (user == null || user.role != "ADMIN") {
      toast.error("m ko co quyen vao day th lz ");
      return <Navigate to="/login" />;
    }
    return children;
  };
  const PrivateRoute = ({ children }) => {
    if (user == null) {
      toast.error("Ban can dang nhap");
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          ),
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

      element: (
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
      ),
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
