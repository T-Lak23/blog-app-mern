import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useComment } from "../../context/commentContext";
import BlogPageComment from "./BlogPageComment";

const Comment = ({
  slug,
  comments,
  onDeleteComment,
  commentLoading,
  onAllDelete,
}) => {
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const { createComment } = useComment();
  const [loading, setLoading] = useState(false);
  const handleComment = async () => {
    try {
      setLoading(true);
      await createComment(comment, slug);
      setComment("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // if (commentLoading) return <div>loading...</div>;

  return (
    <div className="my-6">
      <div className="my-2">Comments</div>
      {user ? (
        <div className="flex flex-col gap-3">
          <textarea
            className="resize-none border border-gray-400 rounded-xl focus:outline-none p-2 shadow-sm  min-h-[100px] "
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <button
            disabled={loading || !comment.trim()}
            onClick={handleComment}
            className="self-start bg-primary py-2 px-3 text-sm rounded-lg text-white font-semibold cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Comment"}
          </button>
        </div>
      ) : (
        <>
          <span className="font-semibold">Login</span> to make a comment
        </>
      )}
      <div className="my-3 flex flex-col gap-7">
        {commentLoading ? (
          <div>Loading comments...</div>
        ) : comments?.length ? (
          comments.map((c) => <BlogPageComment key={c._id} c={c} user={user} />)
        ) : (
          "No comments yet!"
        )}
      </div>
      {user?.role === "admin" ? (
        <div className="my-2">
          <button
            className="bg-red-600 font-semibold text-sm py-2 px-3 rounded-lg text-white cursor-pointer
             hover:bg-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={() => onAllDelete(slug)}
            disabled={!comments.length}
          >
            Delete all
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
