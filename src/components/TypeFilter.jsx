function TypeFilter({
  type,
  setType,
}) {
  return (
    <select
      value={type}
      onChange={(e) =>
        setType(e.target.value)
      }
    >
      <option value="">
        전체 유형
      </option>

      <option value="income">
        수입
      </option>

      <option value="expense">
        지출
      </option>
    </select>
  );
}

export default TypeFilter;