import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommentList = ({
  comments,
  onChange,
  commentLoading,
  onDelete,
  onAllDelete,
}) => {
  const navigate = useNavigate();

  if (commentLoading) return <div>Loading comments...</div>;

  return (
    <>
      <div className="mx-2 border border-border rounded-lg overflow-hidden sm:text-md text-sm shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 bg-secondary p-3 place-items-center font-semibold text-gray-800">
          <div>Comment</div>
          <div className="hidden sm:block">User</div>
          <div>Status</div>
        </div>

        <div className="divide-y divide-border">
          {comments.length ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 place-items-center p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex gap-2 items-start w-full">
                  <button
                    onClick={() => onDelete(comment._id)}
                    className="text-red-600 hover:text-red-800 transition-colors mt-1 "
                    title="Delete comment"
                  >
                    <Trash size={18} className="cursor-pointer" />
                  </button>
                  <div className="flex flex-col">
                    <p className="text-gray-900">{comment.content}</p>
                    <p className="sm:hidden block text-[12px] text-gray-600">
                      by{" "}
                      <span className="font-medium">{comment.user?.name}</span>
                    </p>
                    <p
                      onClick={() => navigate(`/${comment.post.slug}`)}
                      className="sm:text-[13px] text-[11px] text-primary cursor-pointer hover:underline mt-1"
                    >
                      {comment.post?.title}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-gray-700">
                  {comment?.user?.name}
                </div>

                <div>
                  <select
                    value={comment.status}
                    onChange={(e) => onChange(comment._id, e.target.value)}
                    className="bg-secondary border border-border px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-[12px] sm:text-[14px] cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-600">
              No comments found
            </div>
          )}
        </div>
      </div>

      {/* Delete All Button */}
      <div className="mt-5 text-sm flex justify-end mx-2">
        <button
          disabled={comments.length === 0}
          onClick={onAllDelete}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          Delete All Comments
        </button>
      </div>
    </>
  );
};

export default CommentList;
