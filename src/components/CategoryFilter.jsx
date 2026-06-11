function CategoryFilter({
  category,
  setCategory,
  categories,
  type,
}) {
  return (
    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
    >
      <option value="">
        {type === "income"
          ? "전체 수입 카테고리"
          : type === "expense"
          ? "전체 지출 카테고리"
          : "전체 카테고리"}
      </option>

      {categories.map((cat) => (
        <option
          key={cat}
          value={cat}
        >
          {cat}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;