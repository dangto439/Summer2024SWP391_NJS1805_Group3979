import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
