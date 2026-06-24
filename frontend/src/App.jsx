import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";


import { Bell, Search } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Layout */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
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

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-3
                  w-3
                  rounded-full
                  bg-red-500
                "
              />
            </button>

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                font-bold
                text-white
              "
            >
              AJ
            </div>
          </div>
        </header>

        {/* Pages */}
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
