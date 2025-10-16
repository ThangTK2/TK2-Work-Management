import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
