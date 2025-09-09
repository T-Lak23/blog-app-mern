import React, { useEffect, useState } from "react";
import { useComment } from "../context/commentContext";
import CommentList from "../components/AdminComponents/CommentList";
import CommentListSearch from "../components/AdminComponents/CommentListSearch";
import AdminPostPagination from "../components/AdminComponents/AdminPostPagination";

const AdminAllComments = () => {
  const {
    comments,
    showAllCommentsAdmin,
    deleteSingleCommentAdmin,
    commentLoading,
    setCommentStatus,
    deleteAllCommentsAdmin,
  } = useComment();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    status: "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    totalComments: 0,
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    const fecthAllComments = async () => {
      const data = await showAllCommentsAdmin(query);
      if (data?.pagination) setPagination(data.pagination);
    };
    fecthAllComments();
  }, [query, comments.length]);

  const handleStatusChange = async (id, value) => {
    await setCommentStatus(id, { status: value });
  };

  const handleCommentDelete = async (id) => {
    await deleteSingleCommentAdmin(id);
  };

  const handleAllCommentDelete = async () => {
    await deleteAllCommentsAdmin();
  };
  return (
    <div>
      <div className="my-7 mx-3 ">
        <CommentListSearch query={query} setQuery={setQuery} />
      </div>
      <CommentList
        comments={comments}
        onChange={handleStatusChange}
        commentLoading={commentLoading}
        onDelete={handleCommentDelete}
        onAllDelete={handleAllCommentDelete}
      />
      <div>
        <AdminPostPagination
          query={query}
          setQuery={setQuery}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default AdminAllComments;
