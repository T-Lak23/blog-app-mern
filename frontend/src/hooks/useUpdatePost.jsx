import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../context/postContext";
import toast from "react-hot-toast";

const useUpdatePost = (
  postId,
  selected,
  title,
  blogContent,
  status,
  file,
  setTitle,
  setStatus,
  setSelected,
  setBlogContent,
  setSelectedImage
) => {
  const { updatePost } = usePost();

  const { posts, getAllPostsAdmin, loading } = usePost();
  const [loadingPost, setLoadingPost] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await getAllPostsAdmin();
      } catch (err) {
        toast.error("Failed to load posts");
      }
    };

    fetchPosts();
  }, []);

  // Find post by ID
  useEffect(() => {
    if (!posts.length) return;

    const post = posts.find((p) => p._id === postId);
    if (!post) return;

    setTitle(post.title);
    setStatus(post.status.charAt(0).toUpperCase() + post.status.slice(1));
    setSelected(post.category.charAt(0).toUpperCase() + post.category.slice(1));
    setBlogContent(post.content);
    setSelectedImage(post.originalImage || null);

    setLoadingPost(false);
  }, [posts, postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");
    if (!blogContent.trim()) return toast.error("Content cannot be empty");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", selected.toLowerCase());
    formData.append("status", status.toLowerCase());
    formData.append("content", blogContent);
    if (file) formData.append("image", file);

    try {
      await updatePost(postId, formData);
      toast.success("Post updated successfully!");
      return true;
    } catch (err) {
      console.log(err);
      toast.error("Failed to update post");
      return false;
    }
  };
  return { handleUpdate, loadingPost, loading };
};

export default useUpdatePost;
