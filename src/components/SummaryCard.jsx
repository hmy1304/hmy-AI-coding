import React from 'react'

const SummaryCard = ({ income, expense }) => {
  return (
    <div>
      <h2>현재 잔액</h2>

      <p>총 수입 : {income.toLocaleString()}원</p>

      <p>총 지출 : {expense.toLocaleString()}원</p>

      <h3>
        잔액 : {(income - expense).toLocaleString()}원
      </h3>
    </div>
  );
}

export default SummaryCard