import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setErrors({});

    try {
      const response = await axiosClient.post("/user/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Đăng nhập thành công!");
      navigate("/tasks");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.status === 401) {
        setError("Email hoặc mật khẩu không đúng");
      } else {
        console.error(err);
        setError("Đã xảy ra lỗi, vui lòng thử lại sau!");
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
              alt="Văn phòng (nền tối)"
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
                <div className="min-h-[20px]">
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email[0]}</p>
                  )}
                </div>

                {/* Mật khẩu */}
                <label className="block text-sm">
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
                <div className="min-h-[20px]">
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password[0]}</p>
                  )}
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center 
                  text-white transition-colors duration-150 bg-purple-600 border border-transparent 
                  rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none 
                  focus:shadow-outline-purple"
                >
                  Đăng nhập
                </button>
              </form>

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
