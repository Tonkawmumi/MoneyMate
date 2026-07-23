import { useEffect, useState } from "react";
import API from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Label,
} from "recharts";

function MonthlyAnalysisChart() {
  const [monthlyData, setMonthlyData] = useState([]);

  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  useEffect(() => {
    fetchMonthlyData();
  }, [selectedYear]);

  const fetchMonthlyData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await API.get(`/monthly-analysis?userId=${user.id}&year=${selectedYear}`);

      setMonthlyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">รายรับ vs รายจ่าย</h2>
          <p className="mt-1 text-sm text-slate-500">
            การวิเคราะห์รายเดือนของปี {selectedYear + 543}
          </p>
        </div>

        {/* Dropdown */}
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
            cursor-pointer
          "
        >
          {[0, 1, 2, 3, 4, 5].map((offset) => {
            const year = today.getFullYear() + offset;
            return (
              <option key={year} value={year}>
                {year + 543}
              </option>
            );
          })}
        </select>
      </div>

      {/* Charts */}
      <div>
        <p className="mb-2 text-sm font-medium text-slate-500">
          จำนวนเงิน (บาท)
        </p>

        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={4} barCategoryGap="60%">
              <XAxis dataKey="month">
                <Label
                  value="เดือน"
                  position="insideBottom"
                  offset={-20}
                  style={{
                    fill: "var(--muted-foreground)",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                />
              </XAxis>

              <YAxis />

              <Tooltip
                itemSorter={(item) => (item.dataKey === "income" ? -1 : 1)}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}
                labelStyle={{
                  color: "var(--foreground)",
                  fontWeight: 600,
                }}
                itemStyle={{
                  fontWeight: 700,
                }}
                formatter={(value, name) => [
                  `฿${Number(value).toLocaleString()}`,
                  `${name}:`,
                ]}
              />

              <Legend
                content={() => (
                  <div className="mt-8 flex justify-center gap-10">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-chart-1" />
                      <span className="font-medium text-black">รายรับ</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-chart-2" />
                      <span className="font-medium text-black">รายจ่าย</span>
                    </div>
                  </div>
                )}
              />

              <Bar
                dataKey="income"
                name="รายรับ"
                fill="var(--chart-1)"
                radius={[6, 6, 0, 0]}
                barSize={22}
              />

              <Bar
                dataKey="expense"
                name="รายจ่าย"
                fill="var(--chart-2)"
                radius={[6, 6, 0, 0]}
                barSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MonthlyAnalysisChart;
