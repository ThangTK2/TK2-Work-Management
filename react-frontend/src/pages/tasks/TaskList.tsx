import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string | null;
  assigned_user?: { name: string } | null;
  creator?: { name: string } | null;
  created_at: string;
};

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // số task trên mỗi trang

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
    if (!confirm("Bạn có chắc muốn xóa task này không?")) return;
    try {
      const token = localStorage.getItem("token");
      await axiosClient.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Xóa nhiệm vụ thành công!");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Xóa nhiệm vụ thất bại, vui lòng thử lại!"
      );
    }
  };

  // filter search by title & description
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  //Tính toán tasks hiển thị theo trang
  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header onSearch={setSearch} />

        <main className="h-full pb-16 overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Danh sách nhiệm vụ
            </h2>

            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Tiêu đề</th>
                      <th className="px-4 py-3">Mô tả</th>
                      <th className="px-4 py-3">Trạng thái</th>
                      <th className="px-4 py-3">Ngày hết hạn</th>
                      <th className="px-4 py-3">Độ ưu tiên</th>
                      <th className="px-4 py-3">Người được giao</th>
                      <th className="px-4 py-3">Người tạo</th>
                      <th className="px-4 py-3">Ngày tạo</th>
                      <th className="px-4 py-3">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {loading ? (
                      <tr>
                        <td colSpan={10} className="px-4 py-3 text-center">
                          Đang tải nhiệm vụ...
                        </td>
                      </tr>
                    ) : currentTasks.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-4 py-3 text-center">
                          Không có nhiệm vụ nào được tìm thấy.
                        </td>
                      </tr>
                    ) : (
                      currentTasks.map((task, index) => (
                        <tr
                          key={task.id}
                          className="text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                {index + 1}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{task.title}</td>
                          <td className="px-4 py-3 text-sm">
                            {task.description}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                task.status === "new"
                                  ? "text-blue-700 bg-blue-100 dark:bg-blue-700 dark:text-blue-100"
                                  : task.status === "in_progress"
                                  ? "text-yellow-700 bg-yellow-100 dark:bg-yellow-700 dark:text-yellow-100"
                                  : task.status === "pending"
                                  ? "text-orange-700 bg-orange-100 dark:bg-orange-700 dark:text-orange-100"
                                  : task.status === "completed"
                                  ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                                  : task.status === "expired"
                                  ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100"
                                  : "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                              }`}
                            >
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {task.due_date && !isNaN(Date.parse(task.due_date))
                              ? new Date(task.due_date).toLocaleDateString(
                                  "vi-VN"
                                )
                              : "-"}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                task.priority === "low"
                                  ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                                  : task.priority === "medium"
                                  ? "text-orange-700 bg-orange-100 dark:bg-orange-700 dark:text-orange-100"
                                  : task.priority === "high"
                                  ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100"
                                  : "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                              }`}
                            >
                              {task.priority === "low"
                                ? "low"
                                : task.priority === "medium"
                                ? "medium"
                                : task.priority === "high"
                                ? "high"
                                : task.priority}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            {task.assigned_user?.name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {task.creator?.name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(task.created_at).toLocaleDateString(
                              "vi-VN"
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-4 text-sm">
                              <button
                                className="text-green-600 text-sm"
                                onClick={() =>
                                  navigate(`/tasks/detail/${task.id}`)
                                }
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 3.5C5 3.5 1.73 7.11 1 10c.73 2.89 4 6.5 9 6.5s8.27-3.61 9-6.5c-.73-2.89-4-6.5-9-6.5zm0 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                                </svg>
                              </button>
                              <button
                                className="text-purple-600 text-sm"
                                onClick={() =>
                                  navigate(`/tasks/edit/${task.id}`)
                                }
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                </svg>
                              </button>
                              <button
                                className="text-red-600 text-sm"
                                onClick={() => handleDelete(task.id)}
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
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
              <div className="grid px-4 py-3 text-sm font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                <span className="flex items-center col-span-3">
                  Hiển thị {Math.min(indexOfLastTask, filteredTasks.length)}{" "}
                  trong số {filteredTasks.length} nhiệm vụ
                </span>
                <span className="col-span-2"></span>
                <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                  <nav aria-label="Table navigation">
                    <ul className="inline-flex items-center space-x-1">
                      <li>
                        <button
                          className="px-3 py-1 rounded-md"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i}>
                          <button
                            className={`px-3 py-1 rounded-md ${
                              currentPage === i + 1
                                ? "bg-purple-600 text-white"
                                : ""
                            }`}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          className="px-3 py-1 rounded-md"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </span>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default TaskList;
