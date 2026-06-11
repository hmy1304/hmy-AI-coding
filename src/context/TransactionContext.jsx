import {
  createContext,
  useContext,
  useMemo,
  useState
} from "react";

import { v4 as uuidv4 } from "uuid";

import useLocalStorage from "../hooks/useLocalStorage";

const TransactionContext =
  createContext();

export function TransactionProvider({
  children,
}) {
  const [transactions, setTransactions] =
    useLocalStorage(
      "moneybook-transactions",
      []
    );
  
  const [editingItem, setEditingItem] =
    useState(null);

  // CREATE
  const addTransaction = (
    transaction
  ) => {
    const newTransaction = {
      id: uuidv4(),
      ...transaction,
      amount: Number(
        transaction.amount
      ),
    };

    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);
  };

  // UPDATE
  const updateTransaction = (
    updatedTransaction
  ) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id
          ? {
              ...updatedTransaction,
              amount: Number(
                updatedTransaction.amount
              ),
            }
          : item
      )
    );
  };

  // DELETE
  const deleteTransaction = (
    id
  ) => {
    setTransactions((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  const totalIncome =
    useMemo(() => {
      return transactions
        .filter(
          (item) =>
            item.type === "income"
        )
        .reduce(
          (sum, item) =>
            sum + item.amount,
          0
        );
    }, [transactions]);

  const totalExpense =
    useMemo(() => {
      return transactions
        .filter(
          (item) =>
            item.type === "expense"
        )
        .reduce(
          (sum, item) =>
            sum + item.amount,
          0
        );
    }, [transactions]);

  const balance =
    totalIncome - totalExpense;

  const value = {
    transactions,

    addTransaction,
    updateTransaction,
    deleteTransaction,

    editingItem,
    setEditingItem,

    totalIncome,
    totalExpense,
    balance,
  };

  return (
    <TransactionContext.Provider
      value={value}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(
    TransactionContext
  );

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider"
    );
  }

  return context;
}