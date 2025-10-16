import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({}); // key là string, value là mảng string

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
      await axiosClient.post("/user/register", formData);
      alert("Đăng ký thành công!"); // thêm thông báo sau khi đăng ký
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({});
        console.error("Lỗi khi đăng ký người dùng:", err);
        alert("Đã xảy ra lỗi khi đăng ký, vui lòng thử lại sau!");
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
              src="/img/create-account-office.jpeg"
              alt="Văn phòng"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="/img/create-account-office-dark.jpeg"
              alt="Văn phòng (nền tối)"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Đăng ký
              </h1>
              <form onSubmit={handleSubmit}>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Họ và tên
                  </span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 
                    focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                    dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Nguyễn Văn A"
                  />
                  <div className="min-h-[22px]">
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name[0]}</p>
                    )}
                  </div>
                </label>

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
                  <div className="min-h-[22px]">
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email[0]}</p>
                    )}
                  </div>
                </label>

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
                  <div className="min-h-[22px]">
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password[0]}
                      </p>
                    )}
                  </div>
                </label>

                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Xác nhận mật khẩu
                  </span>
                  <input
                    name="password_confirmation"
                    type="password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 
                    focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                    dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Nhập lại mật khẩu"
                  />
                </label>

                <button
                  type="submit"
                  className="block w-full px-4 py-2 mt-6 text-sm font-medium leading-5 
                  text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent 
                  rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
                  Đăng ký
                </button>
              </form>

              <hr className="my-8" />

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đã có tài khoản?{" "}
                <Link
                  to="/user/login"
                  className="font-medium text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
