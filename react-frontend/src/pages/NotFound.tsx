import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
      <img
        src="/404_NotFound.png"
        alt="not found"
        className="max-w-full mb-6 w-72 md:w-96"
      />

      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
        Trang bạn tìm không tồn tại!
      </h1>

      <p className="text-gray-500 dark:text-gray-400">
        Có thể bạn đã nhập sai đường dẫn hoặc trang này đã bị xóa.
      </p>

      <Link
        to="/dashboard"
        className="inline-block px-5 py-2.5 mt-6 font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md hover:shadow-lg transition"
      >
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
