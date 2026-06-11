import { useState, useRef, useEffect } from "react";

import {
  useTransactions,
} from "../context/TransactionContext";

import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import SearchBar from "../components/SearchBar";
import SortSelector from "../components/SortSelector";
import CategoryFilter from "../components/CategoryFilter";
import TypeFilter from "../components/TypeFilter"

import {
  incomeCategories,
  expenseCategories,
} from "../utils/categories";

import "./Transactions.css"

function Transactions() {
  const formRef = useRef(null);

  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,

    editingItem,
    setEditingItem,
  } = useTransactions();

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const [category, setCategory] =
    useState("");

  const [type, setType] =
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
          item.category === category;

        const matchesType =
          !type ||
          item.type === type;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesType
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

  const filterCategories =
    type === "income"
      ? incomeCategories
      : type === "expense"
      ? expenseCategories
      : (() => {
          const categories = [
            ...new Set([
              ...incomeCategories,
              ...expenseCategories,
            ]),
          ];

          return [
            ...categories.filter(
              (cat) => cat !== "기타"
            ),
            "기타",
          ];
        })();

  useEffect(() => {
    if (editingItem && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingItem]);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  useEffect(() => {
    setCategory("");
  }, [type]);

  return (
    <div className="page transactions-page">
      <h1>거래 관리</h1>

      <div 
        ref={formRef} 
        className="transaction-form-wrapper"
      >
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
      </div>

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

        <TypeFilter
          type={type}
          setType={setType}
        />

        <CategoryFilter
          category={category}
          setCategory={setCategory}
          categories={filterCategories}
          type={type}
        />
      </div>

      <TransactionList
        transactions={
          filteredTransactions
        }
        onEdit={
          handleEdit
        }
        onDelete={
          deleteTransaction
        }
      />
    </div>
  );
}

export default Transactions;