import User from '../models/User'
import Company from '../models/Company'
import Question from '../models/Question'
import Blog from '../models/Blog'
import dbConnect from '../lib/db'

export class DashboardService {
  static async getStats(userId: string, role: string) {
    await dbConnect()

    const commonStats = {
      companies: await Company.countDocuments(),
      questions: await Question.countDocuments(),
      blogs: await Blog.countDocuments(),
      myBlogs: await Blog.countDocuments({ author: userId }),
    }

    if (role === 'ADMIN') {
      const users = await User.countDocuments()
      return {
        ...commonStats,
        users,
      }
    }

    // Role is STAFF
    return commonStats
  }
}
