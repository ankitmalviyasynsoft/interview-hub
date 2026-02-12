import Question, { IQuestion } from '../models/Question'
import Category from '../models/Category'
import Company from '../models/Company'
import { BaseService } from './base.service'
import mongoose from 'mongoose'

export class QuestionService extends BaseService<IQuestion> {
  constructor() {
    super(Question)
  }

  async create(data: any): Promise<IQuestion> {
    const resolveRefs = async (items: any[], model: mongoose.Model<any>) => {
      if (!items || !Array.isArray(items)) return []

      const ids: mongoose.Types.ObjectId[] = []
      const names: string[] = []

      for (const item of items) {
        if (mongoose.isValidObjectId(item)) {
          ids.push(item)
        } else if (typeof item === 'string') {
          names.push(item)
        }
      }

      if (names.length > 0) {
        // Find docs where name matches any of the provided names (case-insensitive)
        const docs = await model.find({
          name: { $in: names.map((n) => new RegExp(`^${n}$`, 'i')) },
        })
        ids.push(...docs.map((d) => d._id))
      }

      return ids
    }

    if (data.categories && Array.isArray(data.categories)) {
      data.categories = await resolveRefs(data.categories, Category)
    }

    if (data.targetCompanies && Array.isArray(data.targetCompanies)) {
      data.targetCompanies = await resolveRefs(data.targetCompanies, Company)
    }

    return super.create(data)
  }
}

export const questionService = new QuestionService()
