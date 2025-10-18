import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

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
        alert("Không tìm thấy người dùng");
        navigate("/users");
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (!user) return null; // Không cần loading, chỉ hiển thị khi có dữ liệu

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header onSearch={() => {}} />

        <main className="h-full pb-16 overflow-y-auto">
          <div className="container px-6 mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Chi tiết người dùng
            </h2>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Tên:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                >
                  Sửa
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                  onClick={() => navigate("/users")}
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDetail;
