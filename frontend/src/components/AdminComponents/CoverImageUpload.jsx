import { CircleX, Image } from "lucide-react";
const CoverImageUpload = ({
  dragOver,
  handleFile,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleRemoveImage,
  handleFileChange,
  fileInputRef,
  selectedImage,
}) => {
  return (
    <div
      className={`my-2 w-full max-w-2xl mx-auto rounded-xl p-4 sm:p-5 ${
        dragOver ? "bg-muted-foreground" : "bg-secondary"
      }`}
      onClick={handleFile}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {selectedImage ? (
        <div className="relative">
          <img
            className="w-full max-h-[400px] object-cover rounded-lg"
            src={selectedImage}
            alt="Preview"
          />
          <button
            className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:bg-red-100 transition"
            onClick={handleRemoveImage}
          >
            <CircleX className="text-red-500 w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="text-center h-48 sm:h-60 flex justify-center items-center">
          <div className="cursor-pointer flex flex-col items-center">
            <Image />
            <span className="mt-2 font-medium">Select Cover Image</span>
            <p className="text-xs sm:text-sm text-gray-600">
              or Drag and Drop the image
            </p>
          </div>
        </div>
      )}

      <input
        id="images"
        ref={fileInputRef}
        type="file"
        name="image"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CoverImageUpload;
