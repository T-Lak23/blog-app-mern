import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCreatePost from "../hooks/useCreatePost";
import CoverImageUpload from "../components/AdminComponents/CoverImageUpload";
import Input from "../components/AuthComponents/Input";
import Dropdown from "../components/AdminComponents/Dropdown";
import TextEditor from "../components/AdminComponents/TextEditor";
import { Type } from "lucide-react";

import useUpdatePost from "../hooks/useUpdatePost";

const UpdatePost = () => {
  //   const { updatePost } = usePost();
  const fileInputRef = useRef();
  const { postId } = useParams();
  const navigate = useNavigate();
  //   const { posts, getAllPostsAdmin, loading } = usePost();
  //   const [loadingPost, setLoadingPost] = useState(true);

  const {
    handleFile,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleRemoveImage,
    selectedImage,
    dragOver,
    status,
    setStatus,
    title,
    setTitle,
    blogContent,
    setBlogContent,
    setSelectedImage,
    selected,
    setSelected,
    options,
    statusOptions,
    file,
    setFile,
  } = useCreatePost(fileInputRef);

  const { handleUpdate, loadingPost, loading } = useUpdatePost(
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
  );

  const onSubmit = async (e) => {
    const success = await handleUpdate(e);
    if (success) navigate("/all-posts");
  };
  // Fetch posts first

  if (loadingPost || loading) return <div>Loading post data...</div>;

  return (
    <div className="w-full border border-border rounded-xl p-4 sm:p-6 lg:p-10 my-10">
      <CoverImageUpload
        selectedImage={selectedImage}
        dragOver={dragOver}
        handleFile={handleFile}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        fileInputRef={fileInputRef}
      />

      <div className="flex flex-col gap-2 my-4">
        <Input
          name="title"
          id="title"
          type="text"
          placeholder="Write an engaging title..."
          label="Title"
          logo={<Type size={20} />}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 my-4">
        <div className="flex-1">
          <Dropdown
            selected={selected}
            setSelected={setSelected}
            options={options}
            label="Category"
          />
        </div>
        <div className="flex-1">
          <Dropdown
            selected={status}
            setSelected={setStatus}
            options={statusOptions}
            label="Status"
          />
        </div>
      </div>

      <TextEditor
        onContentChange={setBlogContent}
        initialContent={blogContent}
      />

      <button
        disabled={loading}
        onClick={onSubmit}
        className={`px-3 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-primary"
        }`}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default UpdatePost;
