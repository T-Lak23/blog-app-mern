import { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { usePost } from "../../context/postContext";

export const TextEditor = ({ onContentChange, title, initialContent = "" }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { aiPost } = usePost();

  useEffect(() => {
    if (quillRef.current && initialContent === "") {
      quillRef.current.root.innerHTML = "";
      setWordCount(0);
    }
  }, [initialContent]);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const icons = Quill.import("ui/icons");
      icons["undo"] = "↶";
      icons["redo"] = "↷";

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog here...",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, false] }],
              ["bold", "italic", "underline"],
              ["link"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "code-block"],
              ["clean"],
              ["undo", "redo"],
            ],
            handlers: {
              undo: () => quillRef.current.history.undo(),
              redo: () => quillRef.current.history.redo(),
            },
          },
          history: {
            delay: 1000,
            maxStack: 500,
            userOnly: true,
          },
        },
      });

      if (!quillRef.current || initialContent === undefined) return;

      quillRef.current.root.innerHTML = initialContent;
      const text = quillRef.current.getText().trim();
      setWordCount(text ? text.split(/\s+/).length : 0);

      let timer;
      quillRef.current.on("text-change", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const html = quillRef.current.root.innerHTML;
          const text = quillRef.current.getText().trim();
          const words = text ? text.split(/\s+/).length : 0;
          setWordCount(words);
          onContentChange?.(html);
        }, 250);
      });
    }
  }, [onContentChange, initialContent]);

  const generateContent = async () => {
    setLoading(true);
    const data = await aiPost(title);
    setLoading(false);
    console.log(data);

    quillRef.current.root.innerHTML = data.aiRes;
    const text = quillRef.current.getText().trim();
    const words = text ? text.split(/\s+/).length : 0;
    setWordCount(words);
    onContentChange?.(data.aiRes);
    setShowConfirm(false);
  };

  const handleGenerateContent = () => {
    if (!title || !quillRef.current) return;

    const contentLength = quillRef.current.getLength();
    if (contentLength > 1) {
      setShowConfirm(true);
    } else {
      generateContent();
    }
  };

  return (
    <div className="my-4 space-y-2 w-full">
      {title && (
        <button
          onClick={handleGenerateContent}
          disabled={loading}
          className={`px-3 py-1 rounded text-sm ${
            loading
              ? "bg-gray-400 text-black cursor-not-allowed"
              : "bg-secondary text-black hover:bg-secondary/80"
          }`}
        >
          {loading ? "Generating..." : "Generate Content from Title"}
        </button>
      )}

      {showConfirm && (
        <div className="bg-gray-100 p-3 rounded shadow flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-sm text-gray-700">
            This will replace your current content. Proceed?
          </span>
          <div className="flex gap-2">
            <button
              onClick={generateContent}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Yes, Replace
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        ref={editorRef}
        className="
          min-h-[250px] sm:min-h-[300px] 
          bg-white rounded-lg shadow 
          p-2 sm:p-4 
          text-sm sm:text-base 
          overflow-y-auto
        "
      />
      <div className="text-xs sm:text-sm text-gray-500 flex justify-end">
        Word count: <span className="ml-1 font-medium">{wordCount}</span>
      </div>
    </div>
  );
};

export default TextEditor;
