import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string | null;
  assignedUser?: { name: string } | null;
  creator?: { name: string } | null;
  created_at: string;
};

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await axiosClient.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  // filter search by title & description
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header onSearch={setSearch} />

        <main className="h-full pb-16 overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Tasks
            </h2>

            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Due_date</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Assigned_to</th>
                      <th className="px-4 py-3">Created_by</th>
                      <th className="px-4 py-3">Created_at</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {loading ? (
                      <tr>
                        <td colSpan={10} className="px-4 py-3 text-center">
                          Loading tasks...
                        </td>
                      </tr>
                    ) : filteredTasks.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-4 py-3 text-center">
                          No tasks found.
                        </td>
                      </tr>
                    ) : (
                      filteredTasks.map((task) => (
                        <tr
                          key={task.id}
                          className="text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                {task.id}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{task.title}</td>
                          <td className="px-4 py-3 text-sm">
                            {task.description}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <span
                              className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                task.status === "Done"
                                  ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                                  : task.status === "Pending"
                                  ? "text-orange-700 bg-orange-100 dark:bg-orange-700 dark:text-orange-100"
                                  : task.status === "In_progress"
                                  ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                                  : "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                              }`}
                            >
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {task.due_date || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {task.assignedUser?.name || "-"}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            {task.creator?.name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(task.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-4 text-sm">
                              <button
                                className="flex items-center justify-between px-2 py-2 font-medium leading-5 text-green-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="View"
                                onClick={() =>
                                  navigate(`/tasks/detail/${task.id}`)
                                }
                              >
                                View
                              </button>
                              <button
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="Edit"
                                onClick={() =>
                                  navigate(`/tasks/edit/${task.id}`)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete"
                                onClick={() => handleDelete(task.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination giữ nguyên */}
              <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                <span className="flex items-center col-span-3">
                  Showing 1-{tasks.length} of {tasks.length}
                </span>
                <span className="col-span-2"></span>
                <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                  <nav aria-label="Table navigation">
                    <ul className="inline-flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <li key={i}>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskList;
