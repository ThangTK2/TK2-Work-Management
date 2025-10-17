import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="#"
        >
          Tasks management
        </a>
        <ul className="mt-6">
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
              href="tables.html"
            >
              <span className="ml-4">Dashboard</span>
            </a>
          </li>
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
              href="tables.html"
            >
              <span className="ml-4">Users</span>
            </a>
          </li>
          <li className="relative px-6 py-3">
            <span
              className="absolute inset-y-0 left-5 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            ></span>
            <Link
              to="/tasks"
              className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
            >
              <span className="ml-4">Tasks</span>
            </Link>
          </li>
        </ul>
        <div className="px-6 my-6">
          <Link to="/tasks/create">
            <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Create task
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
