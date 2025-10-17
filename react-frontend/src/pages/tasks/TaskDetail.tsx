import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  assigned_to: string;
  created_by: string;
  created_at: string;
};

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosClient.get(`/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load task");
      }
    };
    fetchTask();
  }, [id]);

  if (!task) return null; // Không còn loading, chỉ hiện khi dữ liệu đã có

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full pb-16 overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Task Details
            </h2>

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
                      Title
                    </td>
                    <td className="px-4 py-2">{task.title}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                      Description
                    </td>
                    <td className="px-4 py-2">{task.description}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </td>
                    <td className="px-4 py-2">{task.status}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                      Priority
                    </td>
                    <td className="px-4 py-2">{task.priority}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                      Due Date
                    </td>
                    <td className="px-4 py-2">{task.due_date || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                      Assigned To
                    </td>
                    <td className="px-4 py-2">{task.assigned_to}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                      Created By
                    </td>
                    <td className="px-4 py-2">{task.created_by}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                      Created At
                    </td>
                    <td className="px-4 py-2">{task.created_at}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskDetail;
