import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { useUser } from "../../hooks/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // dùng context
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Khi người dùng chọn file mới
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Tạo URL tạm để luu image preview
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.post("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = { ...user, avatar: response.data.avatar };

      setUser(updatedUser); // setUser: state user trong Context, không phải state cục bộ của Login.
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Cập nhật avatar thành công!");
      setPreviewUrl(null); // xóa preview sau khi upload thành công
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
  };

  // Giải phóng object URL khi component unmount hoặc previewUrl thay đổi
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500">Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header />

        <main className="h-full pb-16 pt-16 overflow-y-auto">
          <div className="container px-6 mx-auto grid place-items-center">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl dark:bg-gray-800">
              <div className="flex flex-col items-center space-y-6">
                {/* Avatar */}
                <div className="relative">
                  <img
                    className="object-cover w-32 h-32 rounded-full border-4 border-purple-500"
                    src={
                      previewUrl ||
                      (user.avatar
                        ? `http://localhost:8000/storage/${user.avatar}`
                        : "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&w=100&fit=max")
                    }
                    alt="Avatar"
                  />
                  <div className="absolute bottom-0 right-0">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="p-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
                          <path d="M12 12v-6m0 0l-3 3m3-3l3 3" />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-400">
                    Thành viên từ:{" "}
                    {new Date(user.created_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>

                {/* Buttons ngang */}
                <div className="flex gap-4 w-full mt-4">
                  <button
                    onClick={handleUpload}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition focus:outline-none"
                  >
                    Cập nhật avatar
                  </button>
                  <button
                    onClick={() => navigate("/tasks")}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition focus:outline-none"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;
