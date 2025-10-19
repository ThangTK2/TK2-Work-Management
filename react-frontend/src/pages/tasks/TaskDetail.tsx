import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  created_at: string;
  assigned_user?: { name: string } | null;
  creator?: { name: string } | null;
};

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosClient.get(`/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data);
      } catch (err: any) {
        console.error(err);
        toast.error("Không tải được thông tin nhiệm vụ!");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header />

        <main className="h-full pb-16 overflow-y-auto relative">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Đang tải thông tin...
              </p>
            </div>
          )}

          <div
            className={`container px-6 mx-auto grid ${
              loading ? "opacity-50" : ""
            }`}
          >
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Chi tiết nhiệm vụ
            </h2>
            {task && (
              <div className="w-full overflow-hidden rounded-lg shadow-xs bg-white dark:bg-gray-800 p-6">
                <table className="w-full whitespace-no-wrap">
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        ID
                      </td>
                      <td className="px-4 py-2">{task.id}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Tiêu đề
                      </td>
                      <td className="px-4 py-2">{task.title}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Mô tả
                      </td>
                      <td className="px-4 py-2">{task.description}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Trạng thái
                      </td>
                      <td className="px-4 py-2">{task.status}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Độ ưu tiên
                      </td>
                      <td className="px-4 py-2">{task.priority}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Người tạo
                      </td>
                      <td className="px-4 py-2">{task.creator?.name}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Người được giao
                      </td>
                      <td className="px-4 py-2">{task.assigned_user?.name}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Ngày tạo
                      </td>
                      <td className="px-4 py-2">
                        {new Date(task.created_at).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Ngày hết hạn
                      </td>
                      <td className="px-4 py-2">
                        {task.due_date
                          ? new Date(task.due_date).toLocaleDateString("vi-VN")
                          : "Không có ngày hết hạn"}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default TaskDetail;
