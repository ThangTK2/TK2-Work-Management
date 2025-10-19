import { Link, useLocation } from "react-router-dom";
import { useThemeDarkMode } from "../hooks/useThemeDarkMode";

const SideBar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeDarkMode();
  const isActive = (path: string) => location.pathname.startsWith(path); //menu active

  return (
    <aside className="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <Link
          to="/dashboard"
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        >
          TK2 - Quản lý công việc
        </Link>
        <ul className="mt-6">
          <li className="relative px-6 py-2">
            {isActive("/dashboard") && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/dashboard"
              className={`flex items-center w-full px-3 py-2 text-sm font-medium text-gray-800 rounded-md transition-colors duration-150 ${
                isActive("/dashboard")
                  ? "text-purple-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v18h18M9 17V9m6 8V5"
                />
              </svg>
              <span className="ml-4">Dashboard</span>
            </Link>
          </li>

          <li className="relative px-6 py-2">
            {isActive("/users") && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/users"
              className={`flex items-center w-full px-3 py-2 text-sm font-medium text-gray-800 rounded-md transition-colors duration-150 ${
                isActive("/users")
                  ? "text-purple-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.21.896 5.879 2.344M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="ml-4">Người dùng</span>
            </Link>
          </li>

          <li className="relative px-6 py-2">
            {isActive("/tasks") && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/tasks"
              className={`flex items-center w-full px-3 py-2 text-sm font-medium text-gray-800 rounded-md transition-colors duration-150 ${
                isActive("/tasks")
                  ? "text-purple-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m-6 6l2 2 4-4M5 6h14M5 18h14"
                />
              </svg>
              <span className="ml-4">Nhiệm vụ</span>
            </Link>
          </li>
        </ul>

        <div className="px-6 my-6">
          <Link to="/tasks/create">
            <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Tạo nhiệm vụ
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* 🌗 Nút chuyển theme */}
        <div className="px-6 mt-6">
          <button
            onClick={toggleTheme}
            className="focus:border-purple-300 focus:outline-none focus:shadow-outline-purple flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {theme === "dark" ? "🌞 Chế độ sáng" : "🌙 Chế độ tối"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
