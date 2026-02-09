import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  content: string
  author: Schema.Types.ObjectId
  category: Schema.Types.ObjectId
  image?: string
  tags?: string[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
export default Blog
