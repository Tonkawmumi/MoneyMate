import { useEffect, useState } from "react";
import API from "../services/api";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CATEGORY_COLORS = {
  อาหารและเครื่องดื่ม: "var(--category-food)",
  เสื้อผ้า: "var(--category-clothing)",
  เดินทาง: "var(--category-travel)",
  บันเทิง: "var(--category-entertainment)",
  อื่นๆ: "var(--category-other)",
};

const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

function ExpenseBreakdownChart() {
  const [expenseData, setExpenseData] = useState([]);

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  useEffect(() => {
    fetchExpenseData();
  }, [selectedMonth, selectedYear]);

  const fetchExpenseData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await API.get(
        `/expense-breakdown?userId=${user.id}&month=${selectedMonth}&year=${selectedYear}`
      );

      setExpenseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const categoryOrder = [
    "อาหารและเครื่องดื่ม",
    "เสื้อผ้า",
    "เดินทาง",
    "บันเทิง",
    "อื่นๆ",
  ];

  const sortedExpenseData = [...expenseData].sort(
    (a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name),
  );

  const currentMonth = `${thaiMonths[selectedMonth - 1]} ${selectedYear + 543}`;

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">รายละเอียดค่าใช้จ่าย</h2>

          <div className="flex items-center gap-3">
            {/* ปี */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="
              rounded-xl
              border
              border-border
              bg-card
              px-4
              py-2
              outline-none
              hover:border-primary
            "
            >
              {[2026, 2027, 2028, 2029, 2030, 2031].map((year) => (
                <option key={year} value={year}>
                  {year + 543}
                </option>
              ))}
            </select>

            {/* เดือน */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="
              rounded-xl
              border
              border-border
              bg-card
              px-4
              py-2
              outline-none
              hover:border-primary
            "
            >
              {thaiMonths.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          เดือน{currentMonth}
        </p>
      </div>

      {expenseData.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center">
          <p className="text-muted-foreground">ไม่มีข้อมูล</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          {/* Pie Chart */}
          <div className="relative h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sortedExpenseData}
                  dataKey="percent"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {sortedExpenseData.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name, props) => [
                    `฿${props.payload.amount.toLocaleString()}`,
                    props.payload.name,
                  ]}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-full space-y-4">
            {sortedExpenseData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-4 py-2">
                  <div
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{
                      backgroundColor: CATEGORY_COLORS[item.name],
                    }}
                  />

                  <span className="max-w-[120px] break-words text-base font-medium">
                    {item.name}
                  </span>
                </div>

                <span className="shrink-0 font-semibold">
                  ฿{item.amount.toLocaleString()}
                  <span className="ml-1 text-muted-foreground">
                    ({item.percent}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseBreakdownChart;
