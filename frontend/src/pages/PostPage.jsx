import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../context/postContext";
import { useEffect, useState } from "react";
import Navbar from "../components/HomeComponents/Navbar";
import DOMPurify from "dompurify";
import Comment from "../components/BlogComponents/Comment";
import { useComment } from "../context/commentContext";
import Footer from "../components/HomeComponents/Footer";
import AdminPostPagination from "../components/AdminComponents/AdminPostPagination";

const PostPage = () => {
  const { slug } = useParams();
  const { getPostBySlug, posts } = usePost();
  const {
    showApprovedComments,
    comments,
    deleteOwnComment,
    commentLoading,
    commentDelete,
    deleteCommentsOfAPost,
  } = useComment();

  const [post, setPost] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 3,
  });
  const [pagination, setPagination] = useState({
    totalComments: 0,
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    if (!slug) return;
    const getPost = async () => {
      const result = await getPostBySlug(slug);
      setPost(result);
    };
    getPost();
  }, [slug]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await showApprovedComments(slug, query);
      if (data?.pagination) setPagination(data.pagination);
    };
    fetchComments();
  }, [slug, query]);

  const handleDeleteOwnComment = async (slug, id) => {
    await deleteOwnComment(slug, id);
  };

  const handleDeleteCommentSinglePost = async (slug) => {
    await deleteCommentsOfAPost(slug);
  };
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center my-7">
        <div className="flex flex-col gap-6 items-center">
          <img
            src={
              post?.featuredImage ||
              "https://placehold.co/1920x1080?text=No+Image"
            }
            alt={post?.title}
            className="w-200 aspect-video rounded-lg overflow-hidden"
          />
          {post?.category && (
            <p
              className="bg-primary text-white py-1 px-3 rounded-xl text-sm "
              onClick={() => navigate(`/posts/category/${post.category}`)}
            >
              {post?.category?.charAt(0).toUpperCase() +
                post?.category?.slice(1).toLowerCase()}
            </p>
          )}
        </div>

        <div className="mt-6 max-w-3xl w-full px-4">
          {post?.title && (
            <p className=" my-3 text-3xl font-semibold">{post?.title}</p>
          )}

          {post?.author && (
            <div className="flex items-center gap-2 mb-2">
              <img
                className="w-7 h-7 rounded-full"
                src={"https://ui-avatars.com/api/?name=ZX"}
                alt="author-profile-image"
              />
              <p>
                by{" "}
                <span className="font-semibold text-secondary-foreground">
                  {post.author.name}
                </span>
              </p>
            </div>
          )}

          <div className="my-4">
            {post?.content && (
              <div
                className="formatting"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content),
                }}
              />
            )}
          </div>

          {post?.updatedAt && (
            <div className="mt-2">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Updated At:</span>
                <span className="font-semibold text-sm text-gray-500">
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}

          <Comment
            slug={slug}
            comments={comments}
            onDeleteComment={handleDeleteOwnComment}
            commentLoading={commentLoading}
            commentDelete={commentDelete}
            onAllDelete={handleDeleteCommentSinglePost}
          />
          <AdminPostPagination
            query={query}
            setQuery={setQuery}
            pagination={pagination}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PostPage;
