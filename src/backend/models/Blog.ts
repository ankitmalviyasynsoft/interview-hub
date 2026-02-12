import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  tags?: string[]
  status: 'draft' | 'published'
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: { type: Date },
  },
  { timestamps: true },
)

// Pre-save hook to generate slug from title
BlogSchema.pre<IBlog>('save', async function () {
  if (!this.isModified('title')) {
    return
  }

  this.slug = this.title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
})

// Pre-findOneAndUpdate hook to update slug if title changes
BlogSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate() as any
  if (update && update.title) {
    update.slug = update.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }
})

// Check if model already exists to prevent overwrite error in dev mode
if (process.env.NODE_ENV === 'development' && mongoose.models.Blog) {
  delete mongoose.models.Blog
}

const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
export default Blog
