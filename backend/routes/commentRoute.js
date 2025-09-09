import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

import {
  createComment,
  deleteComment,
  showApprovedComments,
  showAllCommentsAdmin,
  updateCommentStatus,
  deleteSingleCommentAdmin,
  deleteAllCommentsAdmin,
  deleteAllCommentsForPost,
} from "../controllers/commentController.js";

// USER ROUTES

// Create a comment on a post
router.post(
  "/post/:slug/comment",
  verifyToken,
  roleMiddleware(["user", "admin"]),
  createComment
);

// Delete own comment
router.delete(
  "/post/:slug/comment/:commentId",
  verifyToken,
  roleMiddleware(["user", "admin"]),
  deleteComment
);

// Get approved comments for a post
router.get("/post/:slug/comments", showApprovedComments);

//ADMIN ROUTES

// Show all comments with pagination & optional status filter
router.get(
  "/admin/comments",
  verifyToken,
  roleMiddleware(["admin"]),
  showAllCommentsAdmin
);

// Update comment status (approve/pending)
router.patch(
  "/admin/comment/:id/status",
  verifyToken,
  roleMiddleware(["admin"]),
  updateCommentStatus
);

// Delete a single comment as admin
router.delete(
  "/admin/comment/:commentId",
  verifyToken,
  roleMiddleware(["admin"]),
  deleteSingleCommentAdmin
);

// Delete all comments globally (admin)
router.delete(
  "/admin/comments/delete-all",
  verifyToken,
  roleMiddleware(["admin"]),
  deleteAllCommentsAdmin
);

// Delete all comments for a specific post (admin)
router.delete(
  "/admin/post/:slug/comments/delete-all",
  verifyToken,
  roleMiddleware(["admin"]),
  deleteAllCommentsForPost
);

export default router;
