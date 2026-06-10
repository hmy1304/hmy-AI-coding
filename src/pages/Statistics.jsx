import {
  Pie,
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import {
  useTransactions,
} from "../context/TransactionContext";

import "./Statistics.css"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Statistics() {
  const {
    transactions,
    totalIncome,
    totalExpense,
  } = useTransactions();

  const expenses =
    transactions.filter(
      (t) =>
        t.type ===
        "expense"
    );

  const categoryMap = {};

  expenses.forEach(
    (expense) => {
      categoryMap[
        expense.category
      ] =
        (categoryMap[
          expense.category
        ] || 0) +
        expense.amount;
    }
  );

  const pieData = {
    labels: Object.keys(categoryMap),

    datasets: [
      {
        data: Object.values(categoryMap),

        backgroundColor: [
          "#ef4444", // 빨강
          "#3b82f6", // 파랑
          "#22c55e", // 초록
          "#f59e0b", // 노랑
          "#8b5cf6", // 보라
          "#ec4899", // 핑크
          "#06b6d4", // 청록
          "#84cc16", // 연두
        ],

        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },

    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
    },
  };

  const monthlyData =
    Array(12).fill(0);

  expenses.forEach(
    (expense) => {
      const month =
        new Date(
          expense.date
        ).getMonth();

      monthlyData[
        month
      ] += expense.amount;
    }
  );

  const barData = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],

    datasets: [
      {
        label: "월별 지출",

        data: monthlyData,

        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#84cc16",
          "#22c55e",
          "#14b8a6",
          "#06b6d4",
          "#3b82f6",
          "#6366f1",
          "#8b5cf6",
          "#d946ef",
          "#ec4899",
        ],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },

    animation: {
      duration: 1500,
    },
  };

  const incomeExpenseData = {
    labels: ["수입", "지출"],
    datasets: [
      {
        label: "수입/지출 비율",
        data: [
          totalIncome,
          totalExpense,
        ],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="page statistics-page">
      <h1>통계</h1>

      <section>
        <h2>수입 / 지출 비율</h2>

        <div className="chart-container">
          <Pie data={incomeExpenseData} options={pieOptions}/>
        </div>
      </section>

      <section>
        <h2>
          카테고리별
          지출
        </h2>

        {expenses.length === 0 ? (
          <p>
            아직 등록된 지출 내역이 없습니다.
          </p>
        ) : (
          <div className="chart-container">
            <Pie
              data={pieData}
              options={pieOptions}
            />
          </div>
        )}
      </section>

      <section>
        <h2>
          월별 지출
        </h2>

        {expenses.length === 0 ? (
          <p>
            표시할 통계 데이터가 없습니다.
          </p>
        ) : (
          <div className="bar-chart-container">
            <Bar data={barData} options={barOptions}/>
          </div>
        )}
      </section>
    </div>
  );
}

export default Statistics;