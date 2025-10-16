import { useState } from "react";
import axiosClient from "../../lib/axiosClient";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [params] = useSearchParams();

  const token = params.get("token");
  const email = params.get("email");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axiosClient.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirm,
      });

      setMessage(res.data.message || "Đặt lại mật khẩu thành công!");

      setTimeout(() => {
        navigate("/user/login");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Lỗi đặt lại mật khẩu");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col justify-center p-6">
          <h1 className="mb-4 text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Đặt lại mật khẩu
          </h1>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm">
              <span className="text-gray-700 dark:text-gray-400">
                Mật khẩu mới
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full mt-1 text-sm form-input"
              />
            </label>

            <label className="block text-sm mt-4">
              <span className="text-gray-700 dark:text-gray-400">
                Xác nhận mật khẩu mới
              </span>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="block w-full mt-1 text-sm form-input"
              />
            </label>

            {message && (
              <p className="text-green-600 text-sm mt-3 text-center">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700"
            >
              Đặt lại mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
