import mongoose, { Schema, Document } from 'mongoose'

export interface IQuestion extends Document {
  title: string
  problemStatement: string
  solution?: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: Schema.Types.ObjectId
  company?: Schema.Types.ObjectId
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

const QuestionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    problemStatement: { type: String, required: true },
    solution: { type: String },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    tags: [{ type: String }],
  },
  { timestamps: true },
)

const Question = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema)
export default Question
