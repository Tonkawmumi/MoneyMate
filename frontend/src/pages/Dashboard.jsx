import { useEffect, useState } from "react";
import API from "../services/api";

import SummaryCard from "../components/SummaryCard";
import MonthlyAnalysisChart from "../components/MonthlyAnalysisChart";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseBreakdownChart from "../components/ExpenseBreakdownChart";
import BudgetOverview from "../components/BudgetOverview";

import { TrendingUp, Receipt, Wallet, PiggyBank } from "lucide-react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    savingsRate: 0,
    savingDifference: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await API.get(`/dashboard/${user.id}`);

      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">
          ยินดีต้อนรับกลับมา!
        </h1>

        <p className="mt-2 text-lg text-muted-foreground">
          {dashboardData.savingDifference > 0 ? (
            <>
              สุขภาพทางการเงินของคุณดีมาก คุณออมเงินได้มากกว่าเดือนที่แล้ว{" "}
              <span className="font-semibold text-black">
                ฿{dashboardData.savingDifference.toLocaleString()}
              </span>
            </>
          ) : dashboardData.savingDifference < 0 ? (
            <>
              คุณออมเงินได้น้อยกว่าเดือนที่แล้ว{" "}
              <span className="font-semibold text-black">
                ฿{Math.abs(dashboardData.savingDifference).toLocaleString()}
              </span>
            </>
          ) : (
            <>สถานะการออมของคุณคงที่เมื่อเทียบกับเดือนที่แล้ว</>
          )}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="รายรับรวม"
          value={`฿${dashboardData.totalIncome.toLocaleString()}`}
          icon={TrendingUp}
          iconBg="var(--card-income-bg)"
          iconColor="var(--card-income-color)"
        />

        <SummaryCard
          title="ค่าใช้จ่ายทั้งหมด"
          value={`฿${dashboardData.totalExpense.toLocaleString()}`}
          icon={Receipt}
          iconBg="var(--card-expense-bg)"
          iconColor="var(--card-expense-color)"
        />

        <SummaryCard
          title="ยอดเงินปัจจุบัน"
          value={`฿${dashboardData.balance.toLocaleString()}`}
          icon={Wallet}
          iconBg="var(--card-balance-bg)"
          iconColor="var(--card-balance-color)"
        />

        <SummaryCard
          title="อัตราการออม"
          value={`${dashboardData.savingsRate}%`}
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
