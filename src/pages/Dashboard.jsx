import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

import { useNavigate } from "react-router-dom";

import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import "./Dashboard.css"

function Dashboard() {
  const [showAll, setShowAll] =
    useState(false);

  const navigate = useNavigate();

  const {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    deleteTransaction,

    setEditingItem,
  } = useTransactions();

  const sortedTransactions =
    [...transactions].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

  const visibleTransactions =
    showAll
      ? sortedTransactions
      : sortedTransactions.slice(0, 5);

  const handleEdit = (item) => {
    setEditingItem(item);

    navigate("/transactions");
  };

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

        {sortedTransactions.length === 0 ? (
          <div className="dashboard-empty">
            아직 등록된 거래 내역이 없습니다.
          </div>
        ) : (
          <TransactionList
            transactions={visibleTransactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
          />
        )}
        {sortedTransactions.length > 5 && (
          <button
            className={`accordion-btn ${
              showAll ? "open" : ""
            }`}
            onClick={() =>
              setShowAll(!showAll)
            }
          >
            ▼
          </button>
        )}
      </section>
    </div>
  );
}

export default Dashboard;