/* eslint-disable react/prop-types */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgetPassword from "./pages/forgot-password";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/reset-password";
import Layout from "./components/layout";
import HomePage from "./pages/home";
import Dashboard from "./components/dashboard";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import { Navigate } from "react-router-dom/dist";
import { toast } from "react-toastify";
import Profile from "./components/profile";
import Intro from "./pages/intro";
import Contact from "./pages/contact";
import ManageAccount from "./components/manage-account";
import Staff from "./components/staff";
import Court from "../src/components/club";
import Club from "../src/components/club";
import Booking from "./pages/booking";
import HistoryBooking from "./pages/history-booking";
import ClubDetail from "./pages/club-detail";
import ListClub from "./pages/list-club";
import Payment from "./pages/payment";
import LayoutAdmin from "./components/layoutadmin";
import AdminDasboard from "./components/admin";
import Contest from "./pages/contest";
import ListContest from "../src/components/list-contest";
import ScheduleContest from "./components/scheduler-contest";

function App() {
  const user = useSelector(selectUser);

  const AuthRoute = ({ children }) => {
    if (user == null || user.role != "ADMIN") {
      toast.error("You are not Admin!");
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
          element: <HomePage />,
        },
        {
          path: "/introduction",
          element: <Intro />,
        },
        {
          path: "/list-club",
          element: <ListClub />,
        },
        {
          path: "/contact",
          element: (
            // <PrivateRoute>
            <Contact />
            // </PrivateRoute>
          ),
        },
        {
          path: "/contest/*",
          element: (
            // <PrivateRoute>
            <Contest />
            // </PrivateRoute>
          ),
          children: [
            {
              path: "danhsach",
              element: <ListContest />,
            },
            {
              path: "thang",
              element: <ScheduleContest />,
            },
          ],
        },
        {
          path: "/booking/:clubId",
          element: <Booking />,
        },
        {
          path: "/profile",
          element: (
            // <PrivateRoute>
            <Profile />
            // </PrivateRoute>
          ),
        },
        {
          path: "/history-booking",
          element: (
            // <PrivateRoute>
            <HistoryBooking />
            // </PrivateRoute>
          ),
        },
        {
          path: "/club-detail/:clubId",
          element: (
            // <PrivateRoute>
            <ClubDetail />
            // </PrivateRoute>
          ),
        },
        {
          path: "/payment",
          element: <Payment />,
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
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "",
          element: <AdminDasboard />,
        },
        {
          path: "account",
          element: <Staff />,
        },
        {
          path: "club",
          element: <Club />,
        },
        {
          path: "setting",
          element: <Staff />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/dashboard/*",
      element: <Dashboard />,
      children: [
        {
          path: "club",
          element: <Club />,
        },
        {
          path: "staff/clubid1",
          element: <Staff />,
        },
        {
          path: "staff/allstaff",
          element: <Staff />,
        },

        {
          path: "court/clubid1",
          element: <Court />,
        },
        // {
        //   path: "booking/clubid1",
        //   element: <Staff />,
        // },

        {
          path: "profile",
          element: <Profile />,
        },

        {
          path: "manage-account",
          element: <ManageAccount />,
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
