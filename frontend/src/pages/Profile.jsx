import { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [username, setUsername] = useState(user.username || "");
  const [showSuccess, setShowSuccess] = useState(false);

  const [previewImage, setPreviewImage] =
  useState(
    user.profile_image
      ? `http://localhost:5000${user.profile_image}`
      : null
  );

  const [selectedFile, setSelectedFile] = useState(null);

  const handleSave = async () => {
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
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold">โปรไฟล์</h1>

        <div className="flex flex-col items-center">
          <div
            className="
              flex h-28 w-28
              items-center justify-center
              overflow-hidden
              rounded-full
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              text-3xl
              font-bold
              text-white
            "
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="
                    h-full
                    w-full
                    rounded-full
                    object-cover
                "
              />
            ) : (
              (username || "?").slice(0, 2).toUpperCase()
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            id="profile-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setPreviewImage(URL.createObjectURL(file));
                setSelectedFile(file);
              }
            }}
          />

          <label
            htmlFor="profile-upload"
            className="
                mt-4
                cursor-pointer
                rounded-xl
                border border-border
                px-4 py-2
                text-sm
                transition
                hover:bg-muted
            "
          >
            เปลี่ยนรูปโปรไฟล์
          </label>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <label className="text-base font-medium">ชื่อ</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                mt-2
                w-full
                rounded-xl
                border border-border
                bg-card
                py-3 pl-4 pr-4
                outline-none
                cursor-text
                transition-all duration-200

                hover:border-primary/40
                hover:shadow-sm

                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          <div>
            <label className="text-base font-medium">Email</label>

            <input
              type="text"
              value={user.email || ""}
              readOnly
              className="
                mt-2
                w-full
                rounded-2xl
                border border-border
                bg-muted
                px-4 py-3
                text-muted-foreground
                cursor-not-allowed
            "
            />
          </div>

          <div>
            <label className="text-base font-medium">วันที่สมาชิก</label>

            <input
              type="text"
              value={
                user.created_at
                  ? new Date(user.created_at).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"
              }
              readOnly
              className="
                mt-2
                w-full
                rounded-2xl
                border border-border
                bg-muted
                px-4 py-3
                text-muted-foreground
                cursor-not-allowed
            "
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="
            mt-8
            w-full
            rounded-xl
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            py-3
            font-medium
            text-white
          "
        >
          บันทึก
        </button>
      </div>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/40
                backdrop-blur-sm
            "
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="
                w-full max-w-md
                rounded-3xl
                bg-white
                p-8
                text-center
                shadow-2xl
                "
            >
              <div
                className="
                    mx-auto
                    flex h-20 w-20
                    items-center justify-center
                    rounded-full
                    bg-green-100
                "
              >
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

export default Profile;
