import React, { useState } from "react";
import BlogListHeader from "../components/AdminComponents/BlogListHeader";
import AdminPostPagination from "../components/AdminComponents/AdminPostPagination";
import BlogListFilterSearch from "../components/AdminComponents/BlogListFilterSearch";

const AllPosts = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 15,
    status: "",
    search: "",
  });

  const [pagination, setPagination] = useState({
    totalPosts: 0,
    currentPage: 1,
    totalPages: 1,
  });
  return (
    <div>
      <div className="text-xl font-semibold">AllPosts</div>
      <BlogListFilterSearch query={query} setQuery={setQuery} />
      <BlogListHeader query={query} setPagination={setPagination} />
      <AdminPostPagination
        query={query}
        setQuery={setQuery}
        pagination={pagination}
      />
    </div>
  );
};

export default AllPosts;
