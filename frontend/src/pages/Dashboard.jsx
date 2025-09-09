import { useEffect, useState } from "react";
import { usePost } from "../context/postContext";
import { useComment } from "../context/commentContext";
import DashboardCard from "../components/AdminComponents/DashboardCard";
import DashboardPostList from "../components/AdminComponents/DashboardPostList";

const Dashboard = () => {
  const { getAllPostsAdmin, posts } = usePost();
  const { comments, showAllCommentsAdmin } = useComment();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await getAllPostsAdmin();
      await showAllCommentsAdmin();
      setLoading(false);
    };
    fetch();
  }, []);

  const countTotal = (outofname, status) => {
    const commentStatus =
      outofname?.filter((c) => c.status === status).length || 0;
    return commentStatus;
  };

  const latestPosts = posts?.slice(0, 5);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          label="All Posts"
          value={posts?.length}
          color="primary"
        />
        <DashboardCard
          label="Published Posts"
          value={countTotal(posts, "published")}
          color="green"
        />
        <DashboardCard
          label="Draft Posts"
          value={countTotal(posts, "draft")}
          color="yellow"
        />
        <DashboardCard
          label="Pending Comments"
          value={countTotal(comments, "pending")}
          color="red"
        />
        <DashboardCard
          label="Approved Comments"
          value={countTotal(comments, "approved")}
          color="green"
        />

        <DashboardPostList posts={latestPosts} />
      </div>
    </div>
  );
};

export default Dashboard;
