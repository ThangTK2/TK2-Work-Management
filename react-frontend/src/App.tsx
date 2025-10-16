import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/user/register",
      element: <Register />,
    },
    {
      path: "/user/login",
      element: <Login />,
    },
    {
      path: "/user/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/user/reset-password",
      element: <ResetPassword />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
