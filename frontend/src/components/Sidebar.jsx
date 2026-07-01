import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  BarChart3,
  Settings,
  CircleHelp,
  LogOut,
  HandCoins,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menus = [
    {
      name: "แดชบอร์ด",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "รายการธุรกรรม",
      path: "/transactions",
      icon: ReceiptText,
    },
    {
      name: "งบประมาณ",
      path: "/budget",
      icon: HandCoins,
    },
    {
      name: "รายงาน",
      path: "/reports",
      icon: BarChart3,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 flex min-h-screen w-72 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-primary/10
            "
          >
            <Wallet size={24} className="text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-primary">MoneyMate</h1>

            <p className="text-sm text-muted-foreground">Personal Finance</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 flex flex-col p-4">
        <div className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                end={menu.path === "/"}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-full px-4 py-3
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `
                }
              >
                <Icon size={20} />

                <span className="font-medium">{menu.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Support */}
        <div className="mt-auto">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            ช่วยเหลือ
          </p>

          <div className="space-y-2">
            <button
              className="
              flex w-full items-center gap-3
              rounded-full px-4 py-3
              text-slate-600
              transition-all duration-200
              hover:bg-slate-100
              "
            >
              <Settings size={20} />
              <span className="font-medium">ตั้งค่า</span>
            </button>

            <button
              className="
                flex w-full items-center gap-3
                rounded-full px-4 py-3
                text-slate-600
                transition-all duration-200
                hover:bg-slate-100
              "
            >
              <CircleHelp size={20} />
              <span className="font-medium">ศูนย์ช่วยเหลือ</span>
            </button>

            <button
              onClick={handleLogout}
              className="
                flex w-full items-center gap-3
                rounded-full px-4 py-3
                text-red-500
                transition-all duration-200
                hover:bg-red-50
              "
            >
              <LogOut size={20} />

              <span className="font-medium">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
