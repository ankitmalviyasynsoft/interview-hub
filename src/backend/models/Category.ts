import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  description?: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)
export default Category
