import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RedirectedRoute from "./utils/RedirectedRoute";
import Login from "./components/AuthComponents/Login";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./utils/AdminRoute";
import Navbar from "./components/HomeComponents/Navbar";
import CreatePost from "./pages/CreatePost";
import AdminLayout from "./pages/AdminLayout";
import { useState } from "react";
import AllPosts from "./pages/AllPosts";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import AllBlogPosts from "./pages/AllBlogPosts";
import AdminAllComments from "./pages/AdminAllComments";

const App = () => {
  const [hideButton, setHideButton] = useState(true);
  return (
    <div className="px-5 sm:px-7 md:px-8 lg:px-10 xl:px-12 pt-6">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<PostPage />} />
        <Route path="/all-blog-posts" element={<AllBlogPosts />} />
        <Route path="posts/category/:category" element={<AllBlogPosts />} />
        <Route element={<AdminRoute />}>
          <Route
            element={
              <AdminLayout
                hideButton={hideButton}
                setHideButton={setHideButton}
              />
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="all-posts" element={<AllPosts />} />
            <Route path="update-post/:postId" element={<UpdatePost />} />
            <Route path="comments" element={<AdminAllComments />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
