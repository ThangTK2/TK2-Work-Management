import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { useUser, type User } from "../../hooks/UserContext";
import { toast } from "react-toastify";

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formUser, setFormUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosClient.get(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Không tìm thấy người dùng");
        navigate("/users");
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formUser) return;

    try {
      const token = localStorage.getItem("token");
      await axiosClient.put(`/users/${id}`, formUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(formUser);
      localStorage.setItem("user", JSON.stringify(formUser));

      toast.success("Cập nhật thành công!");
      navigate("/users");
    } catch (err: any) {
      console.error(err.response?.data || err);
      toast.error("Cập nhật thất bại!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header onSearch={() => {}} />

        <main className="h-full pb-16 overflow-y-auto relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
              <p className="text-gray-500 dark:text-gray-400">
                Đang tải thông tin...
              </p>
            </div>
          )}

          <div
            className={`container px-6 mx-auto mt-6 max-w-lg ${
              loading ? "opacity-50" : ""
            }`}
          >
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Sửa người dùng
            </h2>
            {formUser && (
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4"
              >
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">
                    Tên
                  </label>
                  <input
                    type="text"
                    value={formUser.name}
                    onChange={(e) =>
                      setFormUser({ ...formUser, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formUser.email}
                    onChange={(e) =>
                      setFormUser({ ...formUser, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                    required
                  />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="mr-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/users")}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-gray-200  focus:outline-none focus:shadow-outline-purple"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UserEdit;
