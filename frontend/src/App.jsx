import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

import { Bell, Search } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-72 flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 flex justify-end border-b border-border bg-card px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              className="
                relative
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border border-border
                bg-background
                hover:bg-muted
              "
            >
              <Bell size={20} />

              {/* <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-3
                  w-3
                  rounded-full
                  bg-red-500
                "
              /> */}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="
                  flex h-10 w-10
                  items-center justify-center
                  overflow-hidden
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  font-bold
                  text-white
                "
              >
                {user?.profile_image ? (
                  <img
                    src={`http://localhost:5000${user.profile_image}`}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.username?.slice(0, 2).toUpperCase()
                )}
              </button>

              {showProfile && (
                <div
                  className="
                    absolute right-0 top-14
                    w-72
                    rounded-2xl
                    border border-border
                    bg-card
                    p-6
                    shadow-xl
                  "
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        flex h-16 w-16
                        items-center justify-center
                        overflow-hidden
                        rounded-full
                        bg-gradient-to-r
                        from-indigo-600
                        to-purple-600
                        text-lg
                        font-bold
                        text-white
                      "
                    >
                      {user?.profile_image ? (
                        <img
                          src={`http://localhost:5000${user.profile_image}`}
                          alt="Profile"
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        user.username?.slice(0, 2).toUpperCase()
                      )}
                    </div>

                    <h3 className="mt-3 font-semibold">{user.username}</h3>

                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/profile");
                    }}
                    className="
                      mt-5
                      w-full
                      rounded-xl
                      bg-gradient-to-r
                      from-indigo-600
                      to-purple-600
                      py-3
                      font-medium
                      text-white
                      transition
                      hover:opacity-90
                    "
                  >
                    ดูโปรไฟล์
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Pages */}
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
