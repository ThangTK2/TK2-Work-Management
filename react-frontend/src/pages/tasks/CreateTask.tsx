import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../../lib/axiosClient";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

export default function TaskCreate() {
  const navigate = useNavigate();

  // ✅ Kiểm tra role trước khi render form
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      toast.error("Bạn không có quyền tạo nhiệm vụ!");
      navigate("/tasks");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    due_date: "",
    assigned_to: "",
  });

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

  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axiosClient
      .get("/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        created_by: user.id,
        assigned_to: formData.assigned_to || null,
      };

      await axiosClient.post("/tasks", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Tạo nhiệm vụ thành công!");
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
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full pb-16 overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <h4 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Tạo nhiệm vụ
            </h4>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
              {/* Title */}
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Tiêu đề
                </span>
                <span className="text-red-600 ml-1">*</span>
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
              <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">Mô tả</span>
                <span className="text-red-600 ml-1">*</span>
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
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Trạng thái
                </span>
                <span className="text-red-600 ml-1">*</span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select"
                >
                  <option value="">-- Chọn trạng thái --</option>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              {/* Priority */}
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Độ ưu tiên
                </span>
                <span className="text-red-600">*</span>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select"
                >
                  <option value="">-- Chọn độ ưu tiên --</option>
                  {PRIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
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
                  <option value="">-- Chọn người được giao --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
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
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 
                bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Tạo nhiệm vụ
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
