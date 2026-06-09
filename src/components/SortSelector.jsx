function SortSelector({
  sort,
  setSort,
}) {
  return (
    <select
      value={sort}
      onChange={(e) =>
        setSort(e.target.value)
      }
    >
      <option value="latest">
        최신순
      </option>

      <option value="oldest">
        오래된순
      </option>

      <option value="high">
        금액 높은순
      </option>

      <option value="low">
        금액 낮은순
      </option>
    </select>
  );
}

export default SortSelector;