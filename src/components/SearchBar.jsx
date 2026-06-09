function SearchBar({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="메모 또는 카테고리 검색"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
}

export default SearchBar;