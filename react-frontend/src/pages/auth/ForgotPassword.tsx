import { useState } from "react";
import axiosClient from "../../lib/axiosClient";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axiosClient.post("/forgot-password", { email });
      setMessage(res.data.message || "Đã gửi liên kết đặt lại mật khẩu!");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Không thể gửi email, vui lòng thử lại!"
      );
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          {/* Ảnh bên trái */}
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="/img/forgot-password-office.jpeg"
              alt="Quên mật khẩu"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="/img/forgot-password-office-dark.jpeg"
              alt="Quên mật khẩu"
            />
          </div>

          {/* Form bên phải */}
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">
                Quên mật khẩu
              </h1>

              <form onSubmit={handleSubmit}>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 
                    focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                    dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="email@example.com"
                  />
                </label>

                {message && (
                  <p className="text-green-600 text-sm mt-2 text-center">
                    {message}
                  </p>
                )}
                {error && (
                  <p className="text-red-600 text-sm mt-2 text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center 
                  text-white transition-colors duration-150 bg-purple-600 border border-transparent 
                  rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none 
                  focus:shadow-outline-purple"
                >
                  Gửi liên kết đặt lại
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <Link
                  to="/user/login"
                  className="font-medium text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Quay lại đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
