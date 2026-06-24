import { useState } from "react";
import API from "../services/api";

import { useNavigate, Link } from "react-router-dom";
import { Wallet, User, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const response = await  API.post("/register", {
        username,
        email,
        password,
      });

      console.log(response.data);

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);

      alert("สมัครสมาชิกไม่สำเร็จ");
    }
  };


  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        flex items-center
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
            flex items-center
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

              <h1 className="text-3xl font-bold text-white">MoneyMate</h1>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className=" w-[45%] flex items-center justify-center bg-white p-8 ">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-5 text-center">
              <h2 className="text-3xl font-bold text-slate-900">สมัครสมาชิก</h2>
              <p className="mt-1 text-sm text-slate-500">
                สร้างบัญชีเพื่อเริ่มต้นใช้งาน MoneyMate
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  ชื่อผู้ใช้
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className=" absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 "
                  />

                  <input
                    type="text"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=" 
                        w-full 
                        rounded-xl border border-slate-200 
                        py-2 
                        pl-11 
                        pr-4 
                        text-sm 
                        outline-none 
                        transition 
                        focus:border-indigo-500 
                    "
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  อีเมล
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className=" absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 "
                  />

                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" 
                        w-full 
                        rounded-xl 
                        border border-slate-200 
                        py-2 
                        pl-11 
                        pr-4 
                        text-sm 
                        outline-none 
                        transition 
                        focus:border-indigo-500 
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className=" absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 "
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
                        py-2 
                        pl-11 
                        pr-12 
                        text-sm 
                        outline-none 
                        transition 
                        focus:border-indigo-500 
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className=" absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  ยืนยันรหัสผ่าน
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className=" absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 "
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className=" 
                        w-full 
                        rounded-xl 
                        border border-slate-200 
                        py-2 
                        pl-11 
                        pr-12 
                        text-sm 
                        outline-none 
                        transition 
                        focus:border-indigo-500 
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className=" absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 "
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="
                    mt-6
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
                สมัครสมาชิก
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">
              มีบัญชีอยู่แล้ว?
              <Link
                to="/login"
                className=" ml-2 font-semibold text-indigo-600 "
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
                fixed inset-0 z-[60]
                flex items-center 
                justify-center
                bg-black/40
                backdrop-blur-sm
                p-4
            "
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
                y: 30,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 15,
              }}
              className="
                w-full max-w-md
                rounded-3xl
                bg-white
                p-8
                text-center
                shadow-2xl
                "
            >
              {/* Success Icon */}
              <div className="relative mb-8 flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0, 0.2],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="absolute h-24 w-24 rounded-full bg-green-500/20"
                />

                <div
                  className="
                    relative
                    h-24 w-24
                    flex items-center
                    justify-center
                    rounded-full
                    bg-green-500
                    shadow-lg shadow-green-500/30
                    "
                >
                  <Check size={48} className="text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-slate-900">
                สมัครสมาชิกสำเร็จ!
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Register;
