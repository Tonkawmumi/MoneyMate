import { useState } from "react";
import { User, Shield, Bell, Trash2, Edit, Save, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import { API_BASE_URL } from "../services/api";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [previewImage, setPreviewImage] = useState(
    // user?.profile_image ? `http://localhost:5000${user.profile_image}` : null,
    user?.profile_image ? `${API_BASE_URL}${user.profile_image}` : null,
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveProfile = async () => {
    try {
      await API.put(`/profile/${user.id}`, {
        username,
      });

      let imagePath = user.profile_image;

      if (selectedFile) {
        const formData = new FormData();

        formData.append("image", selectedFile);

        const uploadRes = await API.post(
          `/upload-profile/${user.id}`,
          formData,
        );

        imagePath = uploadRes.data.image;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          username,
          profile_image: imagePath,
        }),
      );

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 p-6 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          การตั้งค่า (Settings)
        </h1>
        <p className="text-slate-500 mt-1">
          จัดการข้อมูลส่วนตัวและความปลอดภัยของบัญชี
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-8 rounded-3xl bg-white p-6 shadow-sm border border-slate-100 min-h-[600px]">
        {/* Inner Sidebar (เมนูย่อย) */}
        <div className="w-full md:w-64 space-y-2 md:border-r border-slate-100 md:pr-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === "profile"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <User size={18} />
            โปรไฟล์ส่วนตัว
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === "security"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Shield size={18} />
            รหัสผ่าน & ความปลอดภัย
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === "notifications"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Bell size={18} />
            การแจ้งเตือน
          </button>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 size={18} />
              ลบบัญชี
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Management */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                โปรไฟล์ส่วนตัว
              </h2>

              {/* Profile Photo Card */}
              <div className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user?.username?.slice(0, 2).toUpperCase() || "U"
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {user?.username || "ชื่อผู้ใช้งาน"}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {user?.email || " Email"}
                    </p>
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="profile-upload"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                      setSelectedFile(file);

                      try {
                        const formData = new FormData();
                        formData.append("image", file);

                        const uploadRes = await API.post(
                          `/upload-profile/${user.id}`,
                          formData,
                        );

                        const updatedUser = {
                          ...user,
                          profile_image: uploadRes.data.image,
                        };
                        localStorage.setItem(
                          "user",
                          JSON.stringify(updatedUser),
                        );

                        console.log("เปลี่ยนรูปโปรไฟล์สำเร็จ!");
                      } catch (error) {
                        console.error("อัปโหลดรูปไม่สำเร็จ:", error);
                      }
                    }
                  }}
                />

                <label
                  htmlFor="profile-upload"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <Edit size={16} /> เปลี่ยนรูปโปรไฟล์
                </label>
              </div>

              {/* Personal Information Form */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                <div className="mb-6">
                  <h3 className="font-bold text-slate-900">ข้อมูลส่วนตัว</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ชื่อ-นามสกุล */}
                  <div>
                    <label className="text-base font-medium block mb-1.5">
                      ชื่อ-นามสกุล
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-base font-medium block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleSaveProfile}
                    className="
                      flex items-center 
                      gap-2 
                      px-6 
                      rounded-xl
                      bg-gradient-to-r
                      from-indigo-600
                      to-purple-600
                      py-3
                      font-medium
                      text-white
                      transition
                      hover:opacity-90 
                      transition-colors"
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Password & Security */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                Password & Security
              </h2>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6">
                <h3 className="font-bold text-slate-900">Change Password</h3>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>

                  <button className="flex items-center gap-2 px-6 py-2.5 font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors mt-2">
                    <Save size={18} /> Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                Notification Preferences
              </h2>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      รับการแจ้งเตือนสรุปรายรับ-รายจ่ายผ่านทางอีเมล
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900">Budget Alerts</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      แจ้งเตือนเมื่อใช้จ่ายใกล้ถึงงบประมาณที่ตั้งไว้
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Marketing & Updates
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      รับข่าวสารฟีเจอร์ใหม่ๆ จาก MoneyMate
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check size={40} className="text-green-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold">บันทึกสำเร็จ!</h2>
              <p className="mt-2 text-slate-500">
                ข้อมูลโปรไฟล์ของคุณได้รับการอัปเดตแล้ว
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Settings;
