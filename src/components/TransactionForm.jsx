import React, { useEffect, useState } from "react";

const TransactionForm = ({
  addTransaction,
  editingItem,
  updateTransaction,
}) => {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: "",
    memo: "",
  })

  useEffect(() => {
    if (editingItem) {
      setForm(editingItem);
    }
  }, [editingItem])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.date) {
      return alert("필수 항목 입력");
    }

    if (editingItem) {
      updateTransaction(form);
    } else {
      addTransaction(form);
    }

    setForm({
      type: "expense",
      amount: "",
      category: "",
      date: "",
      memo: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={form.type}
        onChange={(e) =>
          setForm({
            ...form,
            type: e.target.value,
          })
        }
      >
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>

      <input
        type="number"
        placeholder="금액"
        value={form.amount}
        onChange={(e) =>
          setForm({
            ...form,
            amount: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="카테고리"
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="메모"
        value={form.memo}
        onChange={(e) =>
          setForm({
            ...form,
            memo: e.target.value,
          })
        }
      />

      <button type="submit">
        {editingItem ? "수정" : "추가"}
      </button>
    </form>
  )
}

export default TransactionForm