import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import TaskList from "./pages/tasks/TaskList";
import CreateTask from "./pages/tasks/CreateTask";
import EditTask from "./pages/tasks/EditTask";
import TaskDetail from "./pages/tasks/TaskDetail";

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
    {
      path: "/tasks",
      element: <TaskList />,
    },
    {
      path: "/tasks/create",
      element: <CreateTask />,
    },
    {
      path: "/tasks/detail/:id",
      element: <TaskDetail />,
    },
    {
      path: "/tasks/edit/:id",
      element: <EditTask />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
