import { useEffect, useState } from "react";
import API from "../services/api";

import { Link } from "react-router-dom";
import {
  Utensils,
  Shirt,
  Laptop,
  Film,
  Plane,
  CircleDollarSign,
  Package,
} from "lucide-react";

const categoryBadgeStyles = {
  อาหารและเครื่องดื่ม: {
    backgroundColor: "var(--category-food-bg)",
    color: "var(--category-food)",
  },
  เสื้อผ้า: {
    backgroundColor: "var(--category-clothing-bg)",
    color: "var(--category-clothing)",
  },
  อิเล็กทรอนิกส์: {
    backgroundColor: "var(--category-electronics-bg)",
    color: "var(--category-electronics)",
  },
  บันเทิง: {
    backgroundColor: "var(--category-entertainment-bg)",
    color: "var(--category-entertainment)",
  },
  เดินทาง: {
    backgroundColor: "var(--category-travel-bg)",
    color: "var(--category-travel)",
  },
  รายได้: {
    backgroundColor: "var(--category-income-bg)",
    color: "var(--category-income)",
  },
  อื่นๆ: {
    backgroundColor: "var(--category-other-bg)",
    color: "var(--category-other)",
  },
};

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await API.get("/recent-transactions");

      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatThaiDate = (date) => {
  return new Date(date).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-xl font-semibold">รายการธุรกรรมล่าสุด</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-y border-border bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-base font-semibold uppercase tracking-wider text-muted-foreground">
                วันที่
              </th>

              <th className="px-6 py-4 text-left text-base font-semibold uppercase tracking-wider text-muted-foreground">
                รายการ
              </th>

              <th className="px-6 py-4 text-left text-base font-semibold uppercase tracking-wider text-muted-foreground">
                หมวดหมู่
              </th>

              <th className="px-6 py-4 text-left text-base font-semibold uppercase tracking-wider text-muted-foreground">
                ประเภท
              </th>

              <th className="px-6 py-4 text-right text-base font-semibold uppercase tracking-wider text-muted-foreground">
                จำนวนเงิน
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item, index) => {
              const badgeStyle = categoryBadgeStyles[item.category];

              return (
                <tr
                  key={index}
                  className="
                    transition-colors
                    hover:bg-slate-50
                  "
                >
                  <td className="px-6 py-4 text-slate-600">{formatThaiDate(item.transaction_date)}</td>

                  <td className="px-6 py-4">
                    <span className="font-medium">{item.title}</span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        px-3 py-1
                        text-sm
                        font-medium
                      "
                      style={badgeStyle}
                    >
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        item.type === "income"
                          ? "font-medium text-green-600"
                          : "font-medium text-red-500"
                      }
                    >
                      {item.type === "income" ? "รายรับ" : "รายจ่าย"}
                    </span>
                  </td>

                  <td
                    className={`px-6 py-4 text-right font-bold ${
                      item.type === "income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.type === "income"
                      ? `+฿${item.amount.toLocaleString()}`
                      : `-฿${item.amount.toLocaleString()}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4 text-center">
        <Link
          to="/transactions"
          className="
            font-medium
            text-primary
            transition
            hover:underline
          "
        >
          ดูประวัติทั้งหมด
        </Link>
      </div>
    </div>
  );
}

export default RecentTransactions;
