import { useEffect, useState } from "react";
import { usePost } from "../../context/postContext";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ activeFilter, searchQuery, query, posts }) => {
  // const { getAllPosts, posts, loading } = usePost();
  const { loading } = usePost();
  // const query = { page: 1, limit: 10 };

  const navigate = useNavigate();
  // useEffect(() => {
  //   getAllPosts(query);
  // }, []);

  if (loading) return <p>Loading posts...</p>;
  // const filteredPosts = posts?.filter((post) => {
  //   const matchedCategory =
  //     activeFilter === "All" || post.category === activeFilter.toLowerCase();
  //   const matchesSearch =
  //     post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     post.content.toLowerCase().includes(searchQuery.toLowerCase());

  //   return matchedCategory && matchesSearch;
  // });

  return (
    <div className="flex gap-6 flex-row justify-center flex-wrap lg:gap-10">
      {posts?.length ? (
        posts.map((post) => (
          <div
            key={post._id}
            onClick={() => navigate(`/${post.slug}`)}
            className="rounded-xl overflow-hidden border lg:grid grid-cols-[1fr_2fr] gap-2 block lg:w-full border-border w-[400px] cursor-pointer"
          >
            {/* Cover Image */}
            <div>
              <img
                src={
                  post.featuredImage ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-secondary-foreground">
                  {post.title}
                </p>
                <p
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      post?.content?.slice(0, 500) + "...",
                      {
                        ALLOWED_TAGS: ["p", "strong", "em", "br"],
                        ALLOWED_ATTR: [],
                      }
                    ),
                  }}
                />
              </div>

              {/* Author + Date */}
              <div className="p-3 mb-2 flex justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                  <img
                    className="w-7 h-7 rounded-full object-cover"
                    src={
                      post.author?.avatar ||
                      "https://ui-avatars.com/api/?name=ZX"
                    }
                    alt={post.author?.name || "Author"}
                  />
                  <p className="font-semibold">
                    by {post.author?.name || "Unknown"}
                  </p>
                </div>
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default BlogCard;
