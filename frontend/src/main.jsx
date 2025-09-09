import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext.jsx";
import { PostProvider } from "./context/postContext.jsx";
import { CommentProvider } from "./context/commentContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <CommentProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
              }}
            />
          </CommentProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
