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

const monthlyData = [
  { month: "ม.ค.", income: 35000, expense: 0 },
  { month: "ก.พ.", income: 42000, expense: 18000 },
  { month: "มี.ค.", income: 0, expense: 17000 },
  { month: "เม.ย.", income: 45000, expense: 22000 },
  { month: "พ.ค.", income: 47000, expense: 20000 },
  { month: "มิ.ย.", income: 50000, expense: 24000 },
  { month: "ก.ค.", income: 0, expense: 0 },
  { month: "ส.ค.", income: 48000, expense: 0 },
  { month: "ก.ย.", income: 55000, expense: 25000 },
  { month: "ต.ค.", income: 0, expense: 28000 },
  { month: "พ.ย.", income: 53000, expense: 0 },
  { month: "ธ.ค.", income: 0, expense: 30000 },
];

function MonthlyAnalysisChart() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">รายรับ vs รายจ่าย</h2>
        <p className="mt-1 text-sm text-slate-500">
          การวิเคราะห์รายเดือนของปี 2569
        </p>
      </div>

      {/* <select
          className="
            rounded-full
            border
            border-[#C7C3FF]
            bg-white
            px-5 py-2
            text-base
            font-medium
            text-slate-500
            outline-none
            transition-all
            hover:border-primary
            focus:border-primary
            focus:ring-2
            focus:ring-primary/15
            cursor-pointer
            "
        >
          <option>6 เดือนที่ผ่านมา</option>
          <option>1 ปีที่ผ่านมา</option>
        </select> */}

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
                  <span style={{ fontWeight: 700 }}>
                    ฿{value.toLocaleString()}
                  </span>,
                  <span style={{ fontWeight: 700 }}>{name}</span>,
                ]}
              />

              <Legend
                content={() => (
                  <div className="mt-8 flex justify-center gap-10">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                      <span className="font-medium text-black">รายรับ</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-secondary" />
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
