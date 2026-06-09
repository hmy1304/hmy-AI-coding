import { useState } from "react";

import {
  useTransactions,
} from "../context/TransactionContext";

import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import SearchBar from "../components/SearchBar";
import SortSelector from "../components/SortSelector";
import CategoryFilter from "../components/CategoryFilter";

import {
  incomeCategories,
  expenseCategories,
} from "../utils/categories";

function Transactions() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [editingItem, setEditingItem] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const [category, setCategory] =
    useState("");

  const handleSubmit = (
    formData
  ) => {
    if (editingItem) {
      updateTransaction(formData);
      setEditingItem(null);
    } else {
      addTransaction(formData);
    }
  };

  const filteredTransactions =
    transactions
      .filter((item) => {
        const matchesSearch =
          item.memo
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.category
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          !category ||
          item.category ===
            category;

        return (
          matchesSearch &&
          matchesCategory
        );
      })
      .sort((a, b) => {
        switch (sort) {
          case "latest":
            return (
              new Date(b.date) -
              new Date(a.date)
            );

          case "oldest":
            return (
              new Date(a.date) -
              new Date(b.date)
            );

          case "high":
            return (
              b.amount -
              a.amount
            );

          case "low":
            return (
              a.amount -
              b.amount
            );

          default:
            return 0;
        }
      });

  const allCategories = [
    ...incomeCategories,
    ...expenseCategories,
  ];

  return (
    <div className="page">
      <h1>거래 관리</h1>

      <TransactionForm
        onSubmit={
          handleSubmit
        }
        editingItem={
          editingItem
        }
        cancelEdit={() =>
          setEditingItem(
            null
          )
        }
      />

      <div className="toolbar">
        <SearchBar
          search={search}
          setSearch={
            setSearch
          }
        />

        <SortSelector
          sort={sort}
          setSort={setSort}
        />

        <CategoryFilter
          category={category}
          setCategory={
            setCategory
          }
          categories={
            allCategories
          }
        />
      </div>

      <TransactionList
        transactions={
          filteredTransactions
        }
        onEdit={
          setEditingItem
        }
        onDelete={
          deleteTransaction
        }
      />
    </div>
  );
}

export default Transactions;