import {
  useEffect,
  useState,
  useRef
} from "react";

import {
  incomeCategories,
  expenseCategories,
} from "../utils/categories";

function TransactionForm({
  onSubmit,
  editingItem,
  cancelEdit,
}) {
  const memoInputRef = useRef(null);

  const [form, setForm] =
    useState({
      type: "expense",
      amount: "",
      category: "",
      date: "",
      memo: "",
    });

  useEffect(() => {
    if (editingItem) {
      setForm(editingItem);
    }
  }, [editingItem]);

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !form.amount ||
      !form.date ||
      !form.category
    ) {
      alert(
        "필수 항목을 입력하세요."
      );
      return;
    }

    onSubmit(form);

    setForm({
      type: "expense",
      amount: "",
      category: "",
      date: "",
      memo: "",
    });
  };

  const categories =
    form.type === "income"
      ? incomeCategories
      : expenseCategories;

  useEffect(() => {
    if (
      editingItem &&
      memoInputRef.current
    ) {
      memoInputRef.current.focus();

      memoInputRef.current.select();
    }
  }, [editingItem]);

  return (
    <form
      className="transaction-form"
      onSubmit={handleSubmit}
    >
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
      >
        <option value="income">
          수입
        </option>

        <option value="expense">
          지출
        </option>
      </select>

      <input
        ref={memoInputRef}
        name="amount"
        type="number"
        placeholder="금액"
        value={form.amount}
        onChange={handleChange}
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        <option value="">
          카테고리 선택
        </option>

        {categories.map((cat) => (
          <option
            key={cat}
            value={cat}
          >
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <input
        type="text"
        name="memo"
        placeholder="메모"
        value={form.memo}
        onChange={handleChange}
      />

      <button type="submit">
        {editingItem
          ? "수정 완료"
          : "등록"}
      </button>

      {editingItem && (
        <button
          type="button"
          onClick={cancelEdit}
        >
          취소
        </button>
      )}
    </form>
  );
}

export default TransactionForm;