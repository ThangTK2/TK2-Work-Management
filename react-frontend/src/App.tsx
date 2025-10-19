import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import TaskList from "./pages/tasks/TaskList";
import CreateTask from "./pages/tasks/CreateTask";
import EditTask from "./pages/tasks/EditTask";
import TaskDetail from "./pages/tasks/TaskDetail";
import Profile from "./pages/auth/Profile";
import UserList from "./pages/users/UserList";
import UserDetail from "./pages/users/UserDetail";
import UserEdit from "./pages/users/UserEdit";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/forgot-password" element={<ForgotPassword />} />
          <Route path="/user/reset-password" element={<ResetPassword />} />
          <Route path="/user/profile" element={<Profile />} />

          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="/tasks/detail/:id" element={<TaskDetail />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/users/detail/:id" element={<UserDetail />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
