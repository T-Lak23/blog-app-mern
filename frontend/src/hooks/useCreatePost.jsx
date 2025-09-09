import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePost } from "../context/postContext";
import { useNavigate } from "react-router-dom";

const useCreatePost = (fileInputRef, postId) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState("Other");
  const [status, setStatus] = useState("Draft");
  const options = ["Tech", "Lifestyle", "Business", "Education", "Other"];
  const statusOptions = ["Draft", "Published"];
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const { createPost, posts, loading, updatePost } = usePost();
  const navigate = useNavigate();
  const handleFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      setFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!blogContent.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", selected.toLowerCase());
    formData.append("status", status.toLowerCase());
    formData.append("content", blogContent);
    if (file) formData.append("image", file);
    await createPost(formData);
    navigate("/all-posts");
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    setFile(null);
    setTitle("");
    setBlogContent("");
    setStatus("Draft");
    setSelected("Other");
  };

  const handleContentChange = (html) => {
    setBlogContent(html);
  };

  //POST InitialData;

  //UPDATE POST

  return {
    handlePostSubmit,
    handleContentChange,
    handleRemoveImage,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    handleFile,
    selectedImage,
    setSelectedImage,
    file,
    setFile,
    blogContent,
    setBlogContent,
    title,
    setTitle,
    dragOver,
    setDragOver,
    status,
    setStatus,
    options,
    statusOptions,
    loading,
    selected,
    setSelected,

    posts,
  };
};

export default useCreatePost;
