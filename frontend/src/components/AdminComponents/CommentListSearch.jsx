import { useRef } from "react";

const CommentListSearch = ({ query, setQuery }) => {
  const timeoutRef = useRef();

  const handleSearchChange = (e) => {
    const { value } = e.target;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setQuery((prev) => ({ ...prev, search: value, page: 1 }));
    }, 500);
  };

  const handleStatusChange = (e) => {
    setQuery((prev) => ({ ...prev, status: e.target.value, page: 1 }));
  };

  return (
    <div className="flex sm:flex-row flex-col gap-5 sm:gap-0 sm:justify-between sm:items-center">
      <div className="flex flex-col gap-2">
        <label htmlFor="search-box">Search</label>
        <input
          className="border border-border focus:outline-none p-2 rounded-lg  bg-secondary"
          placeholder="search comment.."
          id="search-box"
          type="text"
          autoComplete="off"
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <select
          className="p-2 border border-border overflow-hidden rounded-lg bg-secondary cursor-pointer focus:outline-none"
          id="status-filter"
          value={query.status}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>
    </div>
  );
};

export default CommentListSearch;
