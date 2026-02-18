import Question, { IQuestion } from '../models/Question'
import Category from '../models/Category'
import Company from '../models/Company'
import { BaseService } from './base.service'
import mongoose from 'mongoose'

export class QuestionService extends BaseService<IQuestion> {
  constructor() {
    super(Question)
  }

  private async resolveReferences(items: any[], model: mongoose.Model<any>) {
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

  private async processData(data: any) {
    // Handle categoryIds -> categories
    const categories = data.categoryIds || data.categories
    if (categories && Array.isArray(categories)) {
      data.categories = await this.resolveReferences(categories, Category)
      delete data.categoryIds
    }

    // Handle companyIds -> targetCompanies
    const companies = data.companyIds || data.targetCompanies
    if (companies && Array.isArray(companies)) {
      data.targetCompanies = await this.resolveReferences(companies, Company)
      delete data.companyIds
    }

    return data
  }

  async create(data: any): Promise<IQuestion> {
    const processedData = await this.processData(data)
    return super.create(processedData)
  }

  async update(id: string, data: any): Promise<IQuestion | null> {
    const processedData = await this.processData(data)
    return super.update(id, processedData)
  }
}

export const questionService = new QuestionService()
