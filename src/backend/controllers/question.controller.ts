import { NextRequest } from 'next/server'
import { BaseController } from './base.controller'
import { questionService } from '../services/question.service'
import Question from '../models/Question'
import Company from '../models/Company'
import Category from '../models/Category'
import { ApiResponse } from '../lib/api-response'
import { ApiFeatures } from '../lib/api-features'

import dbConnect from '../lib/db'

export class QuestionController extends BaseController<any> {
  constructor() {
    super(questionService, Question)
  }

  async getAll(req: NextRequest) {
    try {
      await dbConnect()
      const { searchParams } = new URL(req.url)
      const queryObj = Object.fromEntries(searchParams.entries())

      const { search, company, category, ...restQuery } = queryObj
      const filter: any = {}

      if (search) {
        filter.$or = [{ title: { $regex: search, $options: 'i' } }, { modelAnswer: { $regex: search, $options: 'i' } }]
      }

      if (company && company !== 'null_value') {
        const companyDoc = await Company.findOne({ name: { $regex: new RegExp(`^${company}$`, 'i') } })
        if (companyDoc) {
          filter.targetCompanies = companyDoc._id
        } else {
          // If specified company not found, return empty result
          return ApiResponse.success({
            results: 0,
            total: 0,
            data: [],
          })
        }
      }

      if (category && category !== 'null_value') {
        const categoryDoc = await Category.findOne({ name: { $regex: new RegExp(`^${category}$`, 'i') } })
        if (categoryDoc) {
          filter.categories = categoryDoc._id
        } else {
          return ApiResponse.success({
            results: 0,
            total: 0,
            data: [],
          })
        }
      }

      // Initialize query with our custom filter
      const query = Question.find(filter)

      // Use ApiFeatures for standard operations (pagination, sort, field limiting)
      // Pass restQuery to avoid double-filtering or invalid field errors
      const features = new ApiFeatures(query, restQuery).filter().sort().limitFields().paginate()

      const data = await features.query

      // Count total documents matching the filter (ignoring pagination limits)
      const total = await Question.countDocuments(filter)

      return ApiResponse.success({
        results: data.length,
        total,
        data,
      })
    } catch (error: any) {
      return ApiResponse.error(error.message || 'Internal Server Error', 500)
    }
  }
}

export const questionController = new QuestionController()
