import TransactionItem from "./TransactionItem";

function TransactionList({
  transactions,
  onEdit,
  onDelete,
}) {
  if (
    transactions.length === 0
  ) {
    return (
      <p>
        등록된 거래가 없습니다.
      </p>
    );
  }

  return (
    <div>
      {transactions.map((item) => (
        <TransactionItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TransactionList;