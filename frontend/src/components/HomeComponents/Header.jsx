import { Search } from "lucide-react";
import { useRef, useState } from "react";

const Header = ({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  query,
  setQuery,
}) => {
  const filters = [
    "All",
    "Tech",
    "Lifestyle",
    "Business",
    "Education",
    "Other",
  ];
  const searchRef = useRef();
  const handleFilter = (filter) => {
    const category = filter === "All" ? "" : filter;
    setQuery((prev) => ({
      ...prev,
      category: category.toLowerCase(),
      page: 1,
    }));
  };

  const handleSearch = (e) => {
    if (searchRef.current) clearTimeout(searchRef.current);

    searchRef.current = setTimeout(() => {
      setQuery((prev) => ({ ...prev, search: e.target.value, page: 1 }));
    }, 500);
  };
  return (
    <div className="max-w-3xl mx-auto my-7">
      <div className="w-full flex flex-col gap-7">
        <p className="text-center text-2xl sm:text-3xl sm:text-start font-semibold">
          Discover insightful stories
        </p>
        <div className=" flex gap-2  p-4 text-md border bg-input  border-border rounded-2xl">
          <Search size={22} className=" " />
          <input
            type="search"
            className="flex-1  focus-visible:outline-none placeholder:text-muted-foreground "
            placeholder="Search articles..."
            onChange={handleSearch}
            // value={query.search}
          />
        </div>
        <div className="flex flex-row justify-center gap-4 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={(e) => handleFilter(filter)}
              className={`sm:flex-1  rounded-2xl px-3 py-2 text-sm transition-all cursor-pointer font-semibold ${
                query.category === filter.toLocaleLowerCase() ||
                (filter === "All" && !query.category)
                  ? "bg-primary text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
