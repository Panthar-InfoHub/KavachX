import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  status: "DRAFT" | "PUBLISHED";
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  isFeatured?: boolean;
  isDeleted?: boolean;
  deletedAt?: Date | null;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      trim: true,
      default: "",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
      required: true,
    },
    authorEmail: {
      type: String,
      required: [true, "Author email is required"],
      trim: true,
      lowercase: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
