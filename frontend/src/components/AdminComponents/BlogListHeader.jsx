import { useEffect, useState } from "react";
import { usePost } from "../../context/postContext";
import toast from "react-hot-toast";
import BlogList from "./BlogList";
import useBlogHook from "../../hooks/useBlogHook";

const BlogListHeader = ({ query, setPagination }) => {
  const {
    posts,
    loading,
    handleApplyStatus,
    handleStatusChange,
    handleBlogDelete,
    editStatus,
    confirmDelete,
    setConfirmDelete,
  } = useBlogHook(query, setPagination);

  return (
    <div className="border border-border rounded-xl overflow-x-auto sm:overflow-hidden">
      <table className="w-full text-sm  ">
        <thead className="bg-secondary text-center text-secondary-foreground">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts?.map((p) => (
            <BlogList
              key={p._id}
              post={p}
              currentStatus={editStatus[p._id] ?? p.status}
              onStatusChange={handleStatusChange}
              deleteBlog={() => handleBlogDelete(p)}
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
            />
          ))}
        </tbody>
      </table>

      <div className="p-4 text-right">
        <button
          onClick={handleApplyStatus}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={Object.keys(editStatus).length === 0}
        >
          Apply Status Changes
        </button>
      </div>
    </div>
  );
};

export default BlogListHeader;
