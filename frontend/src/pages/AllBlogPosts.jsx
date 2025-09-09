import React, { useEffect, useState } from "react";
import Navbar from "../components/HomeComponents/Navbar";
import { usePost } from "../context/postContext";
import BlogCard from "../components/BlogComponents/BlogCard";
import AdminPostPagination from "../components/AdminComponents/AdminPostPagination";
import { useParams } from "react-router-dom";

const AllBlogPosts = () => {
  const { getAllPosts, posts } = usePost();
  const { category } = useParams();

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    category: category || "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    totalPosts: 0,
    currentPage: 1,
    totalPages: 1,
  });
  useEffect(() => {
    fetchPosts();
  }, [query, category]);

  useEffect(() => {
    if (category) {
      setQuery((prev) => ({ ...prev, category }));
    }
  }, [category]);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts(query);
      if (data?.pagination) setPagination(data.pagination);
    } catch (error) {}
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="my-5 text-lg">
          Posts category:{" "}
          <span className="font-semibold text-gray-500">
            {" "}
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </span>
        </div>
        <BlogCard query={query} posts={posts} />
      </div>
      <div className="w-full flex justify-center  my-6 ">
        <AdminPostPagination
          query={query}
          setQuery={setQuery}
          pagination={pagination}
        />
      </div>
    </>
  );
};

export default AllBlogPosts;
