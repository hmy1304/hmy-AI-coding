export const formatCurrency = (
  amount
) => {
  return Number(
    amount
  ).toLocaleString("ko-KR");
};

export const getMonth = (
  date
) => {
  return new Date(date).getMonth();
};