import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../../lib/axiosClient";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";

export default function TaskCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "new",
    priority: "medium",
    due_date: "",
    assigned_to: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  // Lấy danh sách users để gán task
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
    setErrors({});
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        created_by: user.id,
        assigned_to: formData.assigned_to || null,
      };

      const response = await axiosClient.post("/tasks", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task created successfully!");
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
          <div className="container grid px-6 mx-auto">
            <h4 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Create Task
            </h4>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
              {/* Title */}
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">Title</span>
                <span className="text-red-600">*</span>
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
                <span className="text-gray-700 dark:text-gray-400">
                  Description
                </span>
                <span className="text-red-600">*</span>
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
                <span className="text-gray-700 dark:text-gray-400">Status</span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 
                  form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                  dark:focus:shadow-outline-gray"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="expired">Expired</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status[0]}</p>
                )}
              </label>

              {/* Due Date */}
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Due Date
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
                  Priority
                </span>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 
                  form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
                  <p className="text-red-500 text-sm">{errors.priority[0]}</p>
                )}
              </label>

              {/* Assigned To */}
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Assigned To
                </span>
                <select
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleChange}
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 
                  form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                >
                  <option value="">-- None --</option>
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
                Create Task
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
