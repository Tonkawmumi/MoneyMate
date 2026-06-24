import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const expenseData = [
  {
    name: "อาหารและเครื่องดื่ม",
    amount: 8500,
    percent: 35,
  },
  {
    name: "เสื้อผ้า",
    amount: 6000,
    percent: 25,
  },
  {
    name: "เดินทาง",
    amount: 3600,
    percent: 15,
  },
  {
    name: "บันเทิง",
    amount: 2400,
    percent: 10,
  },
  {
    name: "อื่นๆ",
    amount: 3600,
    percent: 15,
  },
];

const COLORS = [
  "var(--category-food)",
  "var(--category-clothing)",
  "var(--category-travel)",
  "var(--category-entertainment)",
  "var(--category-other)",
];

function ExpenseBreakdownChart() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">รายละเอียดค่าใช้จ่าย</h2>

        <p className="mt-1 text-sm text-muted-foreground">เดือนมิถุนายน 2569</p>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-8 xl:flex-row">
        {/* Donut Chart */}
        <div className="relative h-[280px] w-full xl:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="percent"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
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

          {/* Center Text */}
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-4 xl:w-1/2">
          {expenseData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-2">

              <div className="flex items-center gap-4 py-2">
                <div
                  className="h-4 w-4 shrink-0 rounded-full"
                  style={{
                    backgroundColor: COLORS[index],
                  }}
                />

                <span
                  className="max-w-[120px] text-base font-medium leading6 break-words">
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
    </div>
  );
}

export default ExpenseBreakdownChart;
