import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiContent, setAiContent] = useState("");

  const createPost = async (formData) => {
    setLoading(true);
    try {
      const { data } = await API.post("/post/create-post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPosts((prev) => [data.post, ...prev]);
      toast.success("New post created");
      return data.post;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllPostsAdmin = async (query = {}) => {
    setLoading(true);
    try {
      const { data } = await API.get("/post/admin-all-posts", {
        params: query,
      });

      if (data.success) {
        setPosts(data.posts);
      } else {
        setPosts([]);
        toast(data.message || "No posts found");
      }

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch all admin posts"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllPosts = async (query = {}) => {
    setLoading(true);
    try {
      const { data } = await API.get("/post/all-posts", {
        params: query,
      });
      if (data.success) {
        setPosts(data.posts);

        // return { posts: data.posts, pagination: data.pagination };
      } else {
        setPosts([]);
        // toast(data.message || "No published posts found");
      }
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch published posts"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPostBySlug = async (slug) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/post/${slug}`);
      return data.post;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch post");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (postId, formData) => {
    setLoading(true);
    try {
      const { data } = await API.patch(
        `/post/update-post/${postId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPosts((prev) => prev.map((p) => (p._id === postId ? data.post : p)));
      toast.success("Post updated successfully");
      return data.post;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update post");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    setLoading(true);
    try {
      await API.delete(`/post/delete-post/${postId}`);
      setPosts((prev) => prev.filter((p) => p._id !== postId));

      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const aiPost = async (prompt) => {
    try {
      const { data } = await API.post("/post/ai/create-post", { prompt });
      setAiContent(data.aiRes);
      return data;
    } catch {
      toast.error(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        createPost,
        getAllPostsAdmin,
        getAllPosts,
        getPostBySlug,
        updatePost,
        deletePost,
        aiPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
