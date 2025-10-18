import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside className="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <Link
          to="/tasks"
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        >
          TK2 - Work Management
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
              <span className="ml-4">Nhiệm vụ</span>
            </Link>
          </li>
        </ul>

        <div className="px-6 my-6">
          <Link to="/tasks/create">
            <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Tạo nhiệm vụ
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
