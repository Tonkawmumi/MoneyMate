import SummaryCard from "../components/SummaryCard";
import MonthlyAnalysisChart from "../components/MonthlyAnalysisChart";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseBreakdownChart from "../components/ExpenseBreakdownChart";
import BudgetOverview from "../components/BudgetOverview";

import { 
  TrendingUp, 
  Receipt, 
  Wallet, 
  PiggyBank 
} from "lucide-react";

function Dashboard() {
  const totalIncome = 45000;
  const totalExpenses = 18000;
  const balance = 27000;
  const savingsRate = 60;

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">
          ยินดีต้อนรับกลับมา!
        </h1>

        <p className="mt-2 text-lg text-muted-foreground">
          สุขภาพทางการเงินของคุณดีมาก คุณออมเงินได้มากกว่าเดือนที่แล้ว{" "}
          <span className="font-semibold text-black">฿420</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="รายรับรวม"
          value={`฿${totalIncome.toLocaleString()}`}
          icon={TrendingUp}
          iconBg="var(--card-income-bg)"
          iconColor="var(--card-income-color)"
        />

        <SummaryCard
          title="ค่าใช้จ่ายทั้งหมด"
          value={`฿${totalExpenses.toLocaleString()}`}
          icon={Receipt}
          iconBg="var(--card-expense-bg)"
          iconColor="var(--card-expense-color)"
        />

        <SummaryCard
          title="ยอดเงินปัจจุบัน"
          value={`฿${balance.toLocaleString()}`}
          icon={Wallet}
          iconBg="var(--card-balance-bg)"
          iconColor="var(--card-balance-color)"
        />

        <SummaryCard
          title="อัตราการออม"
          value={`${savingsRate}%`}
          icon={PiggyBank}
          iconBg="var(--card-saving-bg)"
          iconColor="var(--card-saving-color)"
        />
      </div>

      <div className="mt-8">
        <MonthlyAnalysisChart />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ExpenseBreakdownChart />

        <BudgetOverview />
      </div>

      <div className="mt-8">
        <RecentTransactions />
      </div>
    </div>
  );
}

export default Dashboard;
