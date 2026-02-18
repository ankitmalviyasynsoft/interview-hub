import { complexityEnum, experienceEnum } from '@/utils'
import mongoose, { Schema, Document } from 'mongoose'

export interface IQuestion extends Document {
  title: string
  modelAnswer: string
  targetCompanies: mongoose.Types.ObjectId[]
  categories: mongoose.Types.ObjectId[]
  complexity: 'Easy' | 'Medium' | 'Hard'
  experience: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

const QuestionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a question title'],
      trim: true,
    },
    modelAnswer: {
      type: String,
      required: [true, 'Please provide a model answer'],
    },
    targetCompanies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Company',
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    complexity: {
      type: String,
      enum: complexityEnum,
      default: 'medium',
    },
    experience: {
      type: String,
      enum: experienceEnum,
      default: 'entry',
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
)

// Pre-save hook to generate slug from title
QuestionSchema.pre<IQuestion>('save', async function () {
  if (!this.isModified('title')) {
    return
  }

  this.slug = this.title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
})

// Pre-findOneAndUpdate hook to update slug if title changes
QuestionSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate() as any
  if (update && update.title) {
    update.slug = update.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }
})

// Pre-find hook to populate references
QuestionSchema.pre('find', async function (this: any) {
  this.populate('targetCompanies', 'name _id')
  this.populate('categories', 'name _id')
})

QuestionSchema.pre('findOne', async function (this: any) {
  this.populate('targetCompanies', 'name _id')
  this.populate('categories', 'name _id')
})

// Check if model already exists to prevent overwrite error in dev mode
if (process.env.NODE_ENV === 'development' && mongoose.models.Question) {
  delete mongoose.models.Question
}

const Question = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema)
export default Question
