import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/user/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
