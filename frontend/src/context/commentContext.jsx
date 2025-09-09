import { createContext, useContext, useState } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentDelete, setCommentDelete] = useState(false);

  const createComment = async (content, slug) => {
    try {
      setCommentLoading(true);
      const { data } = await API.post(`/post/${slug}/comment`, { content });

      setComments((prev) => [data.comment, ...prev]);

      toast.success(data.message || "Comment is in review");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed creating comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const deleteOwnComment = async (slug, commentId) => {
    try {
      setCommentDelete(true);
      await API.delete(`/post/${slug}/comment/${commentId}`);
      setComments((prev) => prev.filter((p) => p._id !== commentId));
      toast.success("You deleted a comment!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed deleting comment");
    } finally {
      setCommentDelete(false);
    }
  };

  const showApprovedComments = async (slug, query) => {
    try {
      setCommentLoading(true);
      const { data } = await API.get(`/post/${slug}/comments`, {
        params: query,
      });
      if (data.success) {
        setComments(data?.comments);
      } else {
        setComments([]);
      }

      return data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const showAllCommentsAdmin = async (query) => {
    try {
      setCommentLoading(true);
      const { data } = await API.get("/admin/comments", {
        params: query,
      });
      if (data.success) {
        setComments(data?.comments);
      } else {
        setComments([]);
      }
      return data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const setCommentStatus = async (id, status) => {
    try {
      setCommentLoading(true);
      const { data } = await API.patch(`/admin/comment/${id}/status`, status);

      setComments((prev) => prev.map((p) => (p._id === id ? data.comment : p)));
      toast.success("Comment status updated!");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const deleteSingleCommentAdmin = async (commentId) => {
    try {
      setCommentLoading(true);
      await API.delete(`/admin/comment/${commentId}`);
      setComments((prev) => prev.filter((p) => p._id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const deleteAllCommentsAdmin = async () => {
    try {
      setCommentLoading(true);
      await API.delete("/admin/comments/delete-all");
      setComments([]);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const deleteCommentsOfAPost = async (slug) => {
    try {
      setCommentLoading(true);
      await API.delete(`/admin/post/${slug}/comments/delete-all`);
      setComments((prev) => prev.filter((p) => p.post.slug !== slug));
      toast.success("All comments deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        commentDelete,
        commentLoading,
        comments,
        createComment,
        deleteOwnComment,
        showApprovedComments,
        showAllCommentsAdmin,
        setCommentStatus,
        deleteSingleCommentAdmin,
        deleteAllCommentsAdmin,
        deleteCommentsOfAPost,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => useContext(CommentContext);
