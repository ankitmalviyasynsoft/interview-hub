import mongoose, { Schema, Document } from 'mongoose'

// Interface for Category document
// Extends Mongoose Document to include standard fields like _id
export interface ICategory extends Document {
  name: string
  description: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

// Mongoose Schema for Category
const CategorySchema: Schema = new Schema(
  {
    // Category Name
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
      unique: true,
    },

    // Category Description
    description: {
      type: String,
      required: [true, 'Please provide a category description'],
      trim: true,
    },

    // Slug for URL friendly names
    // Will be auto-generated from name if not provided
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }, // Automatically manage createdAt and updatedAt
)

// Pre-save hook to generate slug from name
CategorySchema.pre<ICategory>('save', async function () {
  if (!this.isModified('name')) {
    return
  }

  // Generate slug from name
  this.slug = this.name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
})

// Pre-findOneAndUpdate hook to update slug if name changes
CategorySchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate() as any
  if (update && update.name) {
    update.slug = update.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }
})

// Check if model already exists to prevent overwrite error in dev mode
// In development, we may want to delete the model to ensure hooks are updated on reload
if (process.env.NODE_ENV === 'development' && mongoose.models.Category) {
  delete mongoose.models.Category
}

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)

export default Category
