import { formatCurrency } from "../utils/calculations";
import "./TransactionItem.css"

function TransactionItem({
  item,
  onEdit,
  onDelete,
}) {
  const handleDelete = () => {
    const confirmed =
      window.confirm(
        "정말 삭제하시겠습니까?"
      );

    if (confirmed) {
      onDelete(item.id);
    }
  };

  return (
    <div className="transaction-item">

      <div className="transaction-info">
        <h4>{item.memo}</h4>

        <p>{item.category}</p>

        <p>{item.date}</p>
      </div>

      <div className="transaction-actions">

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
          {formatCurrency(item.amount)}
          원
        </h3>

        <button
          className="edit-btn"
          onClick={() =>
            onEdit(item)
          }
        >
          수정
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          삭제
        </button>

      </div>

    </div>
  );
}

export default TransactionItem;