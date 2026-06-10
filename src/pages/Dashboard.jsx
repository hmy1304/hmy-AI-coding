import { useTransactions } from "../context/TransactionContext";

import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import "./Dashboard.css"

function Dashboard() {
  const {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    deleteTransaction,
  } = useTransactions();

  const recentTransactions =
    [...transactions]
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 5);

  return (
    <div className="page dashboard-page">
      <h1>대시보드</h1>

      <div className="summary-grid">
        <SummaryCard
          title="총 수입"
          value={totalIncome}
        />

        <SummaryCard
          title="총 지출"
          value={totalExpense}
        />

        <SummaryCard
          title="현재 잔액"
          value={balance}
        />
      </div>

      <section>
        <h2>최근 거래</h2>

        {recentTransactions.length === 0 ? (
          <div className="dashboard-empty">
            아직 등록된 거래 내역이 없습니다.
          </div>
        ) : (
          <TransactionList
            transactions={recentTransactions}
            onEdit={() => {}}
            onDelete={deleteTransaction}
          />
        )}
      </section>
    </div>
  );
}

export default Dashboard;