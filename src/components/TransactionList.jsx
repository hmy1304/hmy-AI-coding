import React from 'react'
import TransactionItem from "./TransactionItem";

const TransactionList = ({
  transactions,
  onDelete,
  onEdit,
}) => {
  return (
    <div>
      {transactions.map((item) => (
        <TransactionItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default TransactionList