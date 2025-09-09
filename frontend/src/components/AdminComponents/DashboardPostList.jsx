const DashboardPostList = ({ posts }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">Latest Posts</h3>
    <div className="space-y-2">
      {posts?.length ? (
        posts.map((p) => (
          <div
            key={p._id}
            className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition"
          >
            {p.title}
          </div>
        ))
      ) : (
        <div className="text-gray-500">No posts available</div>
      )}
    </div>
  </div>
);

export default DashboardPostList;
