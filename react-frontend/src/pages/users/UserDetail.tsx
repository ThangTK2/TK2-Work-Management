import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import type { User } from "../../hooks/UserContext";
import { toast } from "react-toastify";

const UserDetail = () => {
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
        toast.error("Không tìm thấy người dùng!");
        navigate("/users");
      }
    };

    fetchUser();
  }, [id, navigate]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header onSearch={() => {}} />

        <main className="h-full pb-16 overflow-y-auto relative">
          {!user && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
              <p className="text-gray-500 dark:text-gray-400">
                Đang tải thông tin...
              </p>
            </div>
          )}

          <div
            className={`container px-6 mx-auto grid ${
              !user ? "opacity-50" : ""
            }`}
          >
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Chi tiết người dùng
            </h2>
            {user && (
              <div className="w-full overflow-hidden rounded-lg shadow-xs bg-white dark:bg-gray-800 p-6">
                <table className="w-full whitespace-no-wrap">
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        ID
                      </td>
                      <td className="px-4 py-2">{user.id}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Tên
                      </td>
                      <td className="px-4 py-2">{user.name}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Email
                      </td>
                      <td className="px-4 py-2">{user.email}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                        Ngày tạo
                      </td>
                      <td className="px-4 py-2">
                        {new Date(user.created_at).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    onClick={() => navigate("/users")}
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

export default UserDetail;
