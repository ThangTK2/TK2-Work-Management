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
  assigned_to?: number | null;
};

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In Progress" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "expired", label: "Expired" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    due_date: "",
    assigned_to: "",
  });

  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Load task & users
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Task
        const taskRes = await axiosClient.get(`/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const task: Task = taskRes.data;
        setFormData({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          due_date: task.due_date || "",
          assigned_to: task.assigned_to ? String(task.assigned_to) : "",
        });

        // Users
        const usersRes = await axiosClient.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Không tải được dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosClient.put(`/tasks/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật nhiệm vụ thành công!");
      navigate("/tasks");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors as Record<string, string[]>;
        Object.values(errors).forEach((msgs) =>
          msgs.forEach((msg) => toast.error(msg))
        );
      } else {
        console.error(err);
        toast.error(
          err.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại!"
        );
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full relative">
        <Header />

        <main className="h-full pb-16 overflow-y-auto relative">
          {/* Loading overlay */}
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
              Sửa nhiệm vụ
            </h2>

            <div className="px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
              {/* Title */}
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Tiêu đề
                </span>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 
                    focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                    dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                />
              </label>

              {/* Description */}
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">Mô tả</span>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 
                    focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                    dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                />
              </label>

              {/* Status */}
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Trạng thái
                </span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              {/* Priority */}
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Độ ưu tiên
                </span>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select"
                >
                  {PRIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              {/* Assigned To */}
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Người được giao
                </span>
                <select
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select"
                >
                  <option value="">-- Chọn --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* Due Date */}
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Ngày hết hạn
                </span>
                <input
                  name="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-input"
                />
              </label>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 font-medium text-white bg-purple-600 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
                  Lưu thay đổi
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:shadow-outline"
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default EditTask;
