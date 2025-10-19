import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosClient from "../lib/axiosClient";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In Progress" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "expired", label: "Expired" },
];

const Dashboard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [taskStats, setTaskStats] = useState<
    { status: string; count: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Lấy danh sách người dùng
      const userRes = await axiosClient.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserCount(userRes.data.length);

      // Lấy danh sách tasks
      const taskRes = await axiosClient.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskCount(taskRes.data.length);

      // Tính thống kê task theo trạng thái
      const stats = STATUS_OPTIONS.map((s) => ({
        status: s.label,
        count: taskRes.data.filter((task: any) => task.status === s.value)
          .length,
      }));
      setTaskStats(stats);
    } catch (err: any) {
      console.error("Lỗi fetch dashboard:", err);
      toast.error("Lấy thống kê thất bại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header onSearch={() => {}} />
        <main className="h-full pb-16 overflow-y-auto relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
              <p className="text-gray-500 dark:text-gray-400">
                Đang tải thống kê...
              </p>
            </div>
          )}

          <div
            className={`container px-6 mx-auto mt-6 ${
              loading ? "opacity-50" : ""
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
              Dashboard
            </h2>

            {/* Các thống kê */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tổng số người dùng
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {userCount}
                </p>
              </div>
              <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tổng số nhiệm vụ
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {taskCount}
                </p>
              </div>
            </div>

            {/* Biểu đồ */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xs">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Nhiệm vụ theo trạng thái
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={taskStats}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#7e3af2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
