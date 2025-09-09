import imagekit from "../config/imageKit.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import aiResponse from "../utils/ai.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, category, status } = req.body;
    const file = req.file;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can create posts",
      });
    }
    let originalImageUrl = "";
    let featuredImageUrl = "";
    let originalImageId = "";

    if (file) {
      const uploaded = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname + Date.now(),

        folder: "blog_posts",
      });

      originalImageUrl = uploaded.url;
      originalImageId = uploaded.fileId;

      var imageURL = imagekit.url({
        path: uploaded.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      featuredImageUrl = imageURL;
    }

    const post = new Post({
      title,
      content,
      category,
      originalImage: originalImageUrl,
      originalImageId,
      featuredImage: featuredImageUrl,
      status: status || "draft",
      author: req.user.userId,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating post",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const filter = { author: req.user.userId };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }
    const existingPosts = await Post.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    if (!existingPosts.length) {
      return res.status(200).json({
        success: false,
        message: "No posts exist, create one",
        posts: [],
      });
    }
    const totalPosts = await Post.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "All posts",
      posts: existingPosts,
      pagination: {
        totalPosts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching posts" });
  }
};

export const updatePosts = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, category, status } = req.body;
    const file = req.file;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admins can update posts" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (status) post.status = status;

    if (file) {
      if (post.originalImageId) {
        try {
          await imagekit.deleteFile(post.originalImageId);
        } catch (err) {
          console.error("Failed to delete old original image:", err.message);
        }
      }

      const uploaded = await imagekit.upload({
        file: file.buffer,
        fileName: `post_${Date.now()}.jpg`,
        folder: "blog_posts",
      });

      post.originalImage = uploaded.url;
      post.originalImageId = uploaded.fileId;
      post.featuredImage = imagekit.url({
        path: uploaded.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating post" });
  }
};

export const getPublsihedPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = { status: "published" };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }
    const posts = await Post.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .populate("author", "name email");

    if (!posts.length) {
      return res.status(200).json({
        success: false,
        message: "No posts exist, create one",
        posts: [],
      });
    }
    const totalPosts = await Post.countDocuments(filter);
    res.status(200).json({
      success: true,
      message: "All posts",
      posts,
      pagination: {
        totalPosts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching all posts",
    });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug)
      return res
        .status(400)
        .json({ success: false, message: "No slug in url" });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const post = await Post.findOne({ slug, status: "published" }).populate(
      "author",
      "name email"
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comments = await Comment.find({
      post: post._id,
      status: "approved",
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalComments = await Comment.countDocuments({
      post: post._id,
      status: "approved",
    });

    res.status(200).json({
      success: true,
      post: {
        ...post.toObject(),
        comments,
      },
      pagination: {
        totalComments,
        currentPage: page,
        totalPages: Math.ceil(totalComments / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching single post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching single post",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ author: req.user.userId, _id: id });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admins can delete posts" });
    }

    if (post.originalImageId) {
      try {
        await imagekit.deleteFile(post.originalImageId);
      } catch (err) {
        console.error("Failed to delete original image:", err.message);
      }
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    const deletedComments = await Comment.deleteMany({ post: id });

    res.status(200).json({
      success: true,
      message: "Post and its comments deleted successfully",
      post: {
        deletedPost,
        deletedComments,
      },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting post" });
  }
};

///AI

export const aiPost = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.json({ message: "prompt is required!" });
    const data = await aiResponse(prompt);
    res.status(200).json({
      success: true,
      message: "Ai post created!",
      aiRes: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
