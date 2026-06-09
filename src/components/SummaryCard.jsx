import { formatCurrency } from "../utils/calculations";

function SummaryCard({
  title,
  value,
}) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>

      <h2>
        {formatCurrency(value)}원
      </h2>
    </div>
  );
}

export default SummaryCard;