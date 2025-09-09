import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";

import multer from "multer";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
  aiPost,
  createPost,
  deletePost,
  getPostBySlug,
  getPosts,
  getPublsihedPosts,
  updatePosts,
} from "../controllers/postController.js";
const upload = multer();

router.post(
  "/create-post",
  verifyToken,
  roleMiddleware(["admin"]),
  upload.single("image"),
  createPost
);

router.get(
  "/admin-all-posts",
  verifyToken,
  roleMiddleware(["admin"]),
  getPosts
);
// router.get(
//   "/all-posts",
//   verifyToken,
//   roleMiddleware(["admin", "user"]),
//   getPublsihedPosts
// );
router.get(
  "/all-posts",

  getPublsihedPosts
);

// router.get(
//   "/:slug",
//   verifyToken,
//   roleMiddleware(["admin", "user"]),
//   getPostBySlug
// );
router.get(
  "/:slug",

  getPostBySlug
);

router.patch(
  "/update-post/:postId",
  verifyToken,
  roleMiddleware(["admin"]),
  upload.single("image"),
  updatePosts
);
router.delete(
  "/delete-post/:id",
  verifyToken,
  roleMiddleware(["admin"]),
  deletePost
);

router.post("/ai/create-post", verifyToken, roleMiddleware(["admin"]), aiPost);
export default router;
