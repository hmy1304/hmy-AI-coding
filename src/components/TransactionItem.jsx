import { formatCurrency } from "../utils/calculations";

function TransactionItem({
  item,
  onEdit,
  onDelete,
}) {
  return (
    <div className="transaction-item">
      <div>
        <h4>{item.memo}</h4>

        <p>{item.category}</p>

        <p>{item.date}</p>
      </div>

      <div>
        <h3
          className={
            item.type === "income"
              ? "income"
              : "expense"
          }
        >
          {item.type === "income"
            ? "+"
            : "-"}
          {formatCurrency(
            item.amount
          )}
          원
        </h3>

        <button
          onClick={() =>
            onEdit(item)
          }
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
    </div>
  );
}

export default TransactionItem;