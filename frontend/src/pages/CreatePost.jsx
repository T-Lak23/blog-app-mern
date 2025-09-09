import { Type } from "lucide-react";
import { useRef } from "react";
import Input from "../components/AuthComponents/Input";
import Dropdown from "../components/AdminComponents/Dropdown";
import TextEditor from "../components/AdminComponents/TextEditor";
import useCreatePost from "../hooks/useCreatePost";
import CoverImageUpload from "../components/AdminComponents/CoverImageUpload";

const CreatePost = () => {
  const fileInputRef = useRef();

  const {
    handlePostSubmit,
    handleContentChange,
    handleRemoveImage,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    handleFile,
    selectedImage,
    dragOver,
    status,
    title,
    setTitle,
    setStatus,
    options,
    statusOptions,
    loading,
    selected,
    setSelected,
  } = useCreatePost(fileInputRef);

  return (
    <div className="w-full border border-border rounded-xl p-4 sm:p-6 lg:p-10 my-10">
      {/* Cover Image Upload */}
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
      {/* Title Input */}
      <div className="flex flex-col gap-2 my-4">
        <Input
          name="title"
          id={"title"}
          type={"text"}
          placeholder={"Write an engaging title..."}
          label={"Title"}
          logo={<Type size={20} />}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Category & Status */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 my-4">
        <div className="flex-1">
          <Dropdown
            selected={selected}
            setSelected={setSelected}
            options={options}
            label={"Category"}
          />
        </div>
        <div className="flex-1">
          <Dropdown
            selected={status}
            setSelected={setStatus}
            options={statusOptions}
            label={"Status"}
          />
        </div>
      </div>

      {/* Text Editor */}
      <TextEditor onContentChange={handleContentChange} title={title} />

      <button
        disabled={loading}
        onClick={handlePostSubmit}
        className={`px-3 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-primary"
        }`}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default CreatePost;
