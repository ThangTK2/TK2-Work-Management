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
  assigned_to?: number | null;
};

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

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  const STATUS_OPTIONS = [
    { value: "new", label: "Mới" },
    { value: "in_progress", label: "Đang tiến hành" },
    { value: "pending", label: "Đang chờ" },
    { value: "completed", label: "Hoàn thành" },
    { value: "expired", label: "Hết hạn" },
  ];

  const PRIORITY_OPTIONS = [
    { value: "low", label: "Thấp" },
    { value: "medium", label: "Trung bình" },
    { value: "high", label: "Cao" },
  ];

  // Load task theo ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosClient.get(`/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const task: Task = response.data;
        setFormData({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          due_date: task.due_date || "",
          assigned_to: task.assigned_to ? String(task.assigned_to) : "",
        });
      } catch (err) {
        console.error(err);
        alert("Không tải được thông tin nhiệm vụ!");
      }
    };
    fetchTask();
  }, [id]);

  // Load users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosClient.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setErrors({});
    try {
      const token = localStorage.getItem("token");
      await axiosClient.put(`/tasks/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cập nhật nhiệm vụ thành công!");
      navigate("/tasks");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
        alert("Đã xảy ra lỗi, vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full pb-16 overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Sửa nhiệm vụ
            </h2>
            <div className="px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title[0]}</p>
                )}
              </label>

              {/* Description */}
              <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">Mô tả</span>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 
                  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                  dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description[0]}
                  </p>
                )}
              </label>

              {/* Status */}
              <label className="block mt-4 text-sm">
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
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status[0]}</p>
                )}
              </label>

              {/* Due Date */}
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Ngày hết hạn
                </span>
                <input
                  name="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 
                  form-input focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                />
                {errors.due_date && (
                  <p className="text-red-500 text-sm">{errors.due_date[0]}</p>
                )}
              </label>

              {/* Priority */}
              <label className="block mt-4 text-sm">
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
                {errors.priority && (
                  <p className="text-red-500 text-sm">{errors.priority[0]}</p>
                )}
              </label>

              {/* Assigned To */}
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Người được giao
                </span>
                <select
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 
                  form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                >
                  <option value="">-- Chọn --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                {errors.assigned_to && (
                  <p className="text-red-500 text-sm">
                    {errors.assigned_to[0]}
                  </p>
                )}
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 
                bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditTask;
