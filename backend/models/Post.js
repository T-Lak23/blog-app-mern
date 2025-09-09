import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    excerpt: {
      type: String,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["tech", "lifestyle", "business", "education", "other"],
      default: "other",
    },
    originalImage: {
      type: String,
      default: "",
    },
    originalImageId: { type: String, default: "" },
    featuredImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.pre("validate", async function (next) {
  if (this.isModified("title")) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let slugExists = await this.constructor.exists({ slug });
    let counter = 1;
    while (slugExists) {
      slug = slugify(this.title, { lower: true, strict: true }) + "-" + counter;
      counter++;
      slugExists = await this.constructor.exists({ slug });
    }

    this.slug = slug;
  }

  if (this.content && (!this.excerpt || this.isModified("content"))) {
    this.excerpt = this.content.substring(0, 180) + "...";
  }

  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
