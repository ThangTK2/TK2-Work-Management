import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";

type User = {
  id: number;
  name: string;
  email: string;
};

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosClient.get(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
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
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      await axiosClient.put(`/users/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cập nhật thành công!");
      navigate("/users");
    } catch (err: any) {
      console.error(err.response?.data || err);
      alert("Cập nhật thất bại!");
    }
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header onSearch={() => {}} />

        <main className="h-full pb-16 overflow-y-auto">
          <div className="container px-6 mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Sửa người dùng
            </h2>

            <form
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-1">Tên</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                  onClick={() => navigate("/users")}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default UserEdit;
