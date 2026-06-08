import { useEffect, useState } from "react";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SearchBar from "./components/SearchBar.jsx";
import SortSelector from "./components/SortSelector";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("moneybook-transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "moneybook-transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (data) => {
    setTransactions([
      {
        ...data,
        id: Date.now(),
      },
      ...transactions,
    ]);
  };

  const updateTransaction = (updated) => {
    setTransactions(
      transactions.map((item) =>
        item.id === updated.id ? updated : item
      )
    );
    setEditingItem(null);
  };

  const deleteTransaction = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setTransactions(
        transactions.filter((item) => item.id !== id)
      );
    }
  };

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const filtered = transactions
    .filter((item) => {
      return (
        item.memo.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortType) {
        case "latest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "high":
          return b.amount - a.amount;
        case "low":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  return (
    <div className="container">
      <Header />

      <SummaryCard
        income={totalIncome}
        expense={totalExpense}
      />

      <TransactionForm
        addTransaction={addTransaction}
        editingItem={editingItem}
        updateTransaction={updateTransaction}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <SortSelector
        sortType={sortType}
        setSortType={setSortType}
      />

      <TransactionList
        transactions={filtered}
        onDelete={deleteTransaction}
        onEdit={setEditingItem}
      />
    </div>
  );
}

export default App;