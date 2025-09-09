import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import sanitizeHtml from "sanitize-html";
const cleanComment = (comment) => {
  return sanitizeHtml(comment, {
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: { a: ["href"] },
    allowedSchemes: ["http", "https"],
  });
};

export const createComment = async (req, res) => {
  try {
    const { slug } = req.params;
    const { content } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "unauthenticated user" });
    if (!content || content.trim() === "")
      return res
        .status(400)
        .json({ success: false, message: "content is required" });
    const post = await Post.findOne({ status: "published", slug });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const newComment = new Comment({
      content: cleanComment(content),
      status: "pending",
      post: post._id,
      user: user._id,
    });

    await newComment.save();
    res.status(200).json({
      success: true,
      message: "Comment is in review",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating new comment",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const { slug, commentId } = req.params;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated user" });
    }

    const post = await Post.findOne({ status: "published", slug });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (!existingComment.user.equals(user._id)) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot delete this comment" });
    }

    const deletedComment = await Comment.findOneAndDelete({
      post: post._id,
      user: user._id,
      _id: commentId,
    });

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      comment: deletedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting comment",
    });
  }
};

export const showApprovedComments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { slug } = req.params;
    const post = await Post.findOne({ status: "published", slug });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const approvedComments = await Comment.find({
      post: post._id,
      status: "approved",
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (approvedComments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No approved comments found",
        comments: [],
      });
    }
    const totalComments = await Comment.countDocuments({
      post: post._id,
      status: "approved",
    });

    res.json({
      success: true,
      message: "All comments",
      comments: approvedComments,
      pagination: {
        totalComments,
        currentPage: page,
        totalPages: Math.ceil(totalComments / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching comments",
    });
  }
};

export const showAllCommentsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({ success: false, message: "You do not have permission" });

    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.search) {
      filter.content = { $regex: req.query.search, $options: "i" };
    }
    const allComments = await Comment.find(filter)
      .populate("post", "title excerpt slug")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (allComments.length === 0)
      return res.status(200).json({
        success: true,
        message: "No comments found",
        comments: [],
      });

    const totalComments = await Comment.countDocuments(filter);
    res.status(200).json({
      success: true,
      message: "All comments made by users",
      comments: allComments,
      pagination: {
        totalComments,
        currentPage: page,
        totalPages: Math.ceil(totalComments / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching all comments",
    });
  }
};

export const updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({ success: false, message: "You do not have permission" });

    const comment = await Comment.findById(id).populate("user", "name");
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    if (status) comment.status = status;

    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment status updated",
      comment,
    });
  } catch (error) {
    console.error("Error updating comment status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating status",
    });
  }
};

export const deleteSingleCommentAdmin = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (req.user.role !== "admin")
      return res.status(400).json({ success: false, message: "Unauthorized" });

    const comment = await Comment.findById(commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting comment",
    });
  }
};

export const deleteAllCommentsAdmin = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).json({ success: false, message: "Unauthorized" });
    const result = await Comment.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All comments deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all comments:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting all comments",
    });
  }
};

// export const deleteAllCommentsForPost = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     if (req.user.role !== "admin")
//       return res.status(400).json({ success: false, message: "Unauthorized" });

//     const post = await Post.findOne({ slug });
//     if (!post)
//       return res
//         .status(404)
//         .json({ success: false, message: "Post not found" });
//     const comment = await Comment.deleteMany({ post: post._id });
//     res.status(200).json({
//       success: true,
//       message: `All comments for post '${post.title}' deleted successfully`,
//       deletedCount: comment.deletedCount,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while deleting comments for post",
//     });
//   }
// };

export const deleteAllCommentsForPost = async (req, res) => {
  try {
    const { slug } = req.params;

    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Unauthorized" });

    const post = await Post.findOne({ slug });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const result = await Comment.deleteMany({ post: post._id });

    res.status(200).json({
      success: true,
      message: `All comments for post '${post.title}' deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting comments for post",
    });
  }
};
