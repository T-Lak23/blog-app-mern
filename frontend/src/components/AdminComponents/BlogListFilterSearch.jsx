import { useRef } from "react";

const BlogListFilterSearch = ({ query, setQuery }) => {
  const timeRef = useRef();
  const handleStatusChange = (value) => {
    setQuery((prev) => ({ ...prev, status: value, page: 1 }));
  };
  const handleSearch = (e) => {
    if (timeRef.current) clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      setQuery((prev) => ({ ...prev, search: e.target.value }));
    }, 500);
  };
  return (
    <div className="flex flex-col justify-center my-2 items-start  sm:justify-between sm:items-center sm:flex-row-reverse">
      <div>
        <label htmlFor="filter">Filter: </label>
        <select
          id="filter"
          onChange={(e) => handleStatusChange(e.target.value)}
          value={query.status}
          className="bg-secondary rounded-lg px-2 py-2 cursor-pointer focus:outline-none"
        >
          <option value="">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <div className="my-4">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search by title..."
          className="px-3 py-2 rounded-lg focus:ring-offset-0 focus:outline-none border shadow-sm  border-border"
        />
      </div>
    </div>
  );
};

export default BlogListFilterSearch;
