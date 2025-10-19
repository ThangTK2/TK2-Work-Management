import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import { useUser } from "../../hooks/UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/user/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user); // trong context
      toast.success("Đăng nhập thành công!");
      navigate("/tasks");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        // Hiển thị từng lỗi riêng bằng toast
        Object.values(
          err.response.data.errors as Record<string, string[]>
        ).forEach((msgs) => msgs.forEach((msg) => toast.error(msg)));
      } else {
        console.error(err);
        toast.error(
          err.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại sau!"
        );
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="/img/login-office.jpeg"
              alt="Văn phòng"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="/img/login-office-dark.jpeg"
              alt="Văn phòng"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Đăng nhập
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 
                    focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                    dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="email@example.com"
                  />
                </label>

                {/* Mật khẩu */}
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Mật khẩu
                  </span>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 
                    focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                    dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Nhập mật khẩu"
                  />
                </label>

                <button
                  type="submit"
                  className="block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center 
                  text-white transition-colors duration-150 bg-purple-600 border border-transparent 
                  rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none 
                  focus:shadow-outline-purple"
                >
                  Đăng nhập
                </button>
              </form>

              <div className="flex justify-end mt-4">
                <Link
                  to="/user/forgot-password"
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <hr className="my-8" />

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chưa có tài khoản?{" "}
                <Link
                  to="/user/register"
                  className="font-medium text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
