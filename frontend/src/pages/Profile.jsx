import { useState } from "react";
import { Check } from "lucide-react";
import API from "../services/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [username, setUsername] = useState(user.username || "");

  const [previewImage, setPreviewImage] = useState(
    user.profile_image ? `http://localhost:5000${user.profile_image}` : null,
  );

  const [selectedFile, setSelectedFile] = useState(null);

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
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <label className="text-base font-medium">ชื่อ-นามสกุล</label>

            <input
              type="text"
              value={username}
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
            <label className="text-base font-medium">วันที่สมัครสมาชิก</label>

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
      </div>
    </div>
  );
}

export default Profile;
