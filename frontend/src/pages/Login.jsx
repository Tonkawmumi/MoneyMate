import { useState } from "react";
import { Link } from "react-router-dom";

import { Wallet, Mail, Lock, Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        flex
        items-center
        justify-center
        p-6
      "
    >
      {/* Main Card */}
      <div
        className="
          w-full
          max-w-5xl
          h-[620px]
          bg-white
          rounded-[32px]
          overflow-hidden
          shadow-2xl
          flex
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            w-[60%]
            relative
            flex
            items-center
            justify-center
            overflow-hidden
            text-white
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
          "
        >
          {/* Blur Effects */}
          <div
            className="
              absolute
              top-10
              left-10
              h-72
              w-72
              rounded-full
              bg-white/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-10
              right-10
              h-72
              w-72
              rounded-full
              bg-white/10
              blur-3xl
            "
          />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/20
                  backdrop-blur
                "
              >
                <Wallet size={30} />
              </div>

              <h1
                className="text-3xl font-bold text-white"
              >
                MoneyMate
              </h1>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            w-[40%]
            flex
            items-center
            justify-center
            bg-white
            p-10
          "
        >
          <div
            className="
              w-full
              max-w-md
            "
          >
            {/* Heading */}
            <div className="mb-8 text-center">
              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-900
                "
              >
                ยินดีต้อนรับ
              </h2>

              <p className="mt-2 text-slate-500">
                เข้าสู่ระบบเพื่อใช้งาน MoneyMate
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block font-medium">อีเมล</label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      py-3.5
                      pl-12
                      pr-4
                      outline-none
                      transition
                      focus:border-indigo-500
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="mb-2 block font-medium">รหัสผ่าน</label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      py-3.5
                      pl-12
                      pr-14
                      outline-none
                      transition
                      focus:border-indigo-500
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forget */}
              <div
                className="
                  mb-6
                  flex
                  items-center
                  flex justify-end
                "
              >
                <button
                  type="button"
                  className="
                    text-sm
                    font-medium
                    text-indigo-600
                  "
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>

              {/* Login */}
              <button
                type="submit"
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  py-3.5
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                เข้าสู่ระบบ
              </button>

              {/* Register */}
              <p
                className="
                  mt-6
                  text-center
                  text-slate-600
                "
              >
                ยังไม่มีบัญชี?
                <Link
                  to="/register"
                  className="
                    ml-2
                    font-semibold
                    text-indigo-600
                  "
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
