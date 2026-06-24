import { Link } from "react-router-dom";
import {
  ArrowRight,
  Utensils,
  Shirt,
  Car,
  Music4,
  Package,
  CircleDollarSign,
} from "lucide-react";

const categoryIcons = {
  "อาหารและเครื่องดื่ม": Utensils,
  "เสื้อผ้า": Shirt,
  "เดินทาง": Car,
  "บันเทิง": Music4,
  "รายได้": CircleDollarSign,
  "อื่นๆ": Package,
};

const categoryBgColors = {
  "อาหารและเครื่องดื่ม": "var(--category-food-bg)",
  "เสื้อผ้า": "var(--category-clothing-bg)",
  "เดินทาง": "var(--category-travel-bg)",
 "บันเทิง": "var(--category-entertainment-bg)",
  "รายได้": "var(--category-income-bg)",
  "อื่นๆ": "var(--category-other-bg)",
};

const budgetData = [
  {
    category: "อาหารและเครื่องดื่ม",
    spent: 8500,
    budget: 12000,
    color: "var(--category-food)",
  },
  {
    category: "เสื้อผ้า",
    spent: 6000,
    budget: 10000,
    color: "var(--category-clothing)",
  },
  {
    category: "เดินทาง",
    spent: 3600,
    budget: 8000,
    color: "var(--category-travel)",
  },
  {
    category: "บันเทิง",
    spent: 2400,
    budget: 5000,
    color: "var(--category-entertainment)",
  },
  {
    category: "อื่นๆ",
    spent: 3600,
    budget: 7000,
    color: "var(--category-other)",
  },
];

function BudgetOverview() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">ภาพรวมงบประมาณ</h2>

        <p className="mt-1 text-sm text-muted-foreground">เดือนมิถุนายน 2569</p>
      </div>

      <div className="space-y-6">
        {budgetData.map((item) => {
          const percent = Math.round((item.spent / item.budget) * 100);

          const Icon = categoryIcons[item.category];
          const iconBg = categoryBgColors[item.category];

          return (
            <div key={item.category}>
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      shrink-0
                    "
                    style={{
                      backgroundColor: iconBg,
                      color: item.color,
                    }}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>

                  <span className="font-medium">{item.category}</span>
                </div>

                <span className="font-semibold">
                  ฿{item.spent.toLocaleString()}
                  <span className="text-muted-foreground">
                    {" "}
                    / ฿{item.budget.toLocaleString()}
                  </span>
                </span>
              </div>

              {/* Progress */}
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              {/* Footer */}
              <div className="mt-2 text-right text-sm text-muted-foreground">
                ใช้ไป {percent}%
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t border-border pt-5">
        <Link
          to="/budget"
          className="
            group flex items-center
            justify-center gap-2
            rounded-2xl
            bg-primary
            px-5 py-3
            font-medium
            text-white
            transition-all
            duration-200
            hover:scale-[1.02]
            hover:shadow-lg
            hover:shadow-primary/20
          "
        >
          จัดการงบประมาณทั้งหมด
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

export default BudgetOverview;
