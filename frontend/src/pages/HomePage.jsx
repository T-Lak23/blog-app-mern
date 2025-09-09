import { useEffect, useState } from "react";
import BlogCard from "../components/BlogComponents/BlogCard";
import Footer from "../components/HomeComponents/Footer";
import Header from "../components/HomeComponents/Header";
import Navbar from "../components/HomeComponents/Navbar";
import { useNavigate } from "react-router-dom";
import AdminPostPagination from "../components/AdminComponents/AdminPostPagination";
import { usePost } from "../context/postContext";

const HomePage = () => {
  const { getAllPosts, posts } = usePost();
  // const [activeFilter, setActiveFilter] = useState("All");
  // const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    category: "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    totalPosts: 0,
    currentPage: 1,
    totalPages: 1,
  });
  // const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [query]);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts(query);
      if (data?.pagination) setPagination(data.pagination);
    } catch (error) {}
  };

  return (
    <div>
      <Navbar />
      <Header
        // activeFilter={activeFilter}
        // setActiveFilter={setActiveFilter}
        // searchQuery={searchQuery}
        // setSearchQuery={setSearchQuery}
        query={query}
        setQuery={setQuery}
      />
      <div className="max-w-7xl mx-auto">
        <p className="mt-10 mb-5 lg:text-xl text-lg font-semibold">
          Latest Posts
        </p>
        <BlogCard
          // searchQuery={searchQuery}
          // activeFilter={activeFilter}
          query={query}
          posts={posts}
        />
        {/* <div className="w-full flex justify-center  my-6 ">
          <button
            className=" px-3 py-2 rounded-xl bg-primary cursor-pointer text-white text-center "
            onClick={() => navigate("/all-blog-posts")}
          >
            All Posts
          </button>
        </div> */}
        <div className="w-full flex justify-center  my-6 ">
          <AdminPostPagination
            query={query}
            setQuery={setQuery}
            pagination={pagination}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
