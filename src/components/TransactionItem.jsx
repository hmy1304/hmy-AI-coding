import React from 'react'

const TransactionItem = ({
  item,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        margin: "10px 0",
        padding: "10px",
      }}
    >
      <p>
        [{item.type === "income"
          ? "수입"
          : "지출"}]
      </p>

      <p>{item.amount}원</p>

      <p>{item.category}</p>

      <p>{item.date}</p>

      <p>{item.memo}</p>

      <button
        onClick={() => onEdit(item)}
      >
        수정
      </button>

      <button
        onClick={() =>
          onDelete(item.id)
        }
      >
        삭제
      </button>
    </div>
  )
}

export default TransactionItem