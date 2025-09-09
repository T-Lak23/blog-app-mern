import { Check, Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import useBlogHook from "../../hooks/useBlogHook";
import { useNavigate } from "react-router-dom";

const BlogList = ({
  post,
  currentStatus,
  onStatusChange,
  deleteBlog,
  confirmDelete,
  setConfirmDelete,
}) => {
  useEffect(() => {
    if (!confirmDelete) return;
    const timer = setTimeout(() => setConfirmDelete(null), 5000);
    return () => clearTimeout(timer);
  }, [confirmDelete]);
  const navigate = useNavigate();
  const { formattedAgo } = useBlogHook();
  return (
    <tr className="border-b hover:bg-gray-50 text-center border-border ">
      <td className="px-4 py-2 font-medium text-gray-800 text-start">
        {post.title}
      </td>
      <td className="px-4 py-2 text-gray-500">
        {formattedAgo(post.createdAt)}
      </td>
      <td className="px-4 py-2">
        <select
          value={currentStatus}
          className="bg-white border rounded px-2 py-1 text-sm"
          onChange={(e) => onStatusChange(post._id, e.target.value)}
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </td>
      <td className="px-4 py-2 ">
        <div className="flex items-center justify-evenly gap-4">
          <button
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate(`/update-post/${post._id}`)}
          >
            <Pencil size={18} />
          </button>
          <button onClick={deleteBlog} className="cursor-pointer">
            {confirmDelete === post._id ? (
              <p className="bg-red-600 text-white  font-semibold p-1 rounded-md">
                <Check size={18} />
              </p>
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogList;
