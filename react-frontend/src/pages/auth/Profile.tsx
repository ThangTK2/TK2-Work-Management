import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { useUser } from "../../hooks/UserContext";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Khi click avatar -> mở modal xem ảnh lớn
  const handleOpenImage = () => {
    setIsOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
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
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Cập nhật avatar thành công!");
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
    }
  };

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

  const avatarUrl =
    previewUrl ||
    (user.avatar
      ? `http://localhost:8000/storage/${user.avatar}`
      : "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg");

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
                    className="object-cover w-32 h-32 rounded-full border-4 border-purple-500 cursor-pointer hover:opacity-90 transition"
                    src={avatarUrl}
                    alt="Avatar"
                    onClick={handleOpenImage}
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

                {/* Thông tin user */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                {/* Nút */}
                <div className="flex gap-4 w-full mt-4">
                  <button
                    onClick={handleUpload}
                    className="flex-1 px-4 py-2 text-sm text-white bg-purple-600 rounded-full hover:bg-purple-700 transition"
                  >
                    Cập nhật avatar
                  </button>
                  <button
                    onClick={() => navigate("/tasks")}
                    className="flex-1 px-4 py-2 text-sm text-white bg-purple-600 rounded-full hover:bg-purple-700 transition"
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

      {/* Modal xem ảnh lớn */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={previewUrl || `http://localhost:8000/storage/${user.avatar}`}
              alt="Avatar"
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
