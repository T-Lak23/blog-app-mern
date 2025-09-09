import { Trash } from "lucide-react";

const BlogPageComment = ({ c, user }) => {
  return (
    <>
      <div key={c._id}>
        {c.status === "approved" && (
          <div className="bg-secondary px-4 py-3 border border-border rounded-lg flex flex-col gap-5">
            <div className="flex gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${c?.user.name.charAt(
                  0
                )}`}
                className="w-7 h-7 rounded-full"
                alt={c?.user.name}
              />
              <p className="font-semibold">{c?.user.name}</p>
            </div>
            <div className="flex justify-between">
              {" "}
              <p>{c?.content}</p>
              {user?._id === c?.user._id || user?.role === "admin" ? (
                <p onClick={() => onDeleteComment(slug, c._id)}>
                  <Trash className="cursor-pointer" size={18} />
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPageComment;
