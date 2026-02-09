import User from '../models/User'
import Company from '../models/Company'
import Question from '../models/Question'
import Blog from '../models/Blog'
import dbConnect from '../lib/db'

export class DashboardService {
  static async getStats() {
    await dbConnect()
    const [users, companies, questions, blogs] = await Promise.all([User.countDocuments(), Company.countDocuments(), Question.countDocuments(), Blog.countDocuments()])

    return {
      users,
      companies,
      questions,
      blogs,
    }
  }
}
