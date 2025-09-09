import { useEffect, useState } from "react";
import { usePost } from "../context/postContext";
import toast from "react-hot-toast";

const useBlogHook = (query, setPagination) => {
  const { posts, loading, getAllPostsAdmin, updatePost, deletePost } =
    usePost();
  const [editStatus, setEditStatus] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  useEffect(() => {
    fetchPosts();
  }, [query]);

  const fetchPosts = async () => {
    try {
      const data = await getAllPostsAdmin(query);
      if (data?.pagination) setPagination(data.pagination);
    } catch (error) {}
  };
  const handleStatusChange = (postId, newStatus) => {
    setEditStatus((prev) => ({ ...prev, [postId]: newStatus }));
  };

  const handleApplyStatus = async () => {
    const updates = Object.entries(editStatus);
    if (updates.length === 0) {
      toast("No changes to apply");
      return;
    }
    try {
      for (let [id, status] of updates) {
        const formData = new FormData();
        formData.append("status", status);
        await updatePost(id, formData);
      }

      toast.success("Statuses updated");
      setEditStatus({});
    } catch (error) {
      toast.error("Failed to apply status updates");
    }
  };

  const handleBlogDelete = async (p) => {
    if (confirmDelete !== p._id) {
      setConfirmDelete(p._id);
      return;
    }
    try {
      await deletePost(p._id);
      setConfirmDelete(null);
      toast.success("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };
  ////DATETIME STUFF

  const formattedAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  };

  return {
    posts,
    loading,
    handleApplyStatus,
    handleStatusChange,
    handleBlogDelete,
    editStatus,
    confirmDelete,
    setConfirmDelete,
    formattedAgo,
  };
};

export default useBlogHook;
