import { NextRequest } from 'next/server'
import User from '../models/User'
import { ApiResponse } from '../lib/api-response'
import { handleError } from '../lib/error-handler'
import { ApiFeatures } from '../lib/api-features'
import { UserService } from '../services/user.service'

export class UserController {
  static async getAllUsers(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url)
      const queryObj = Object.fromEntries(searchParams.entries())

      const features = new ApiFeatures(User.find(), queryObj).filter().sort().limitFields().paginate()

      const users = await features.query

      // Get total count for pagination metadata
      // This is a simplified count, might need to respect filters for accurate count
      const total = await User.countDocuments((features as any).queryString)

      return ApiResponse.success({
        results: users.length,
        total,
        data: users,
      })
    } catch (error) {
      return handleError(error)
    }
  }

  static async getUser(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params
      const user = await UserService.findUserById(id)

      if (!user) {
        return ApiResponse.notFound('User not found')
      }

      return ApiResponse.success(user)
    } catch (error) {
      return handleError(error)
    }
  }

  static async updateUser(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params
      const body = await req.json()

      // Prevent password update via this route
      if (body.password) {
        delete body.password
      }

      const user = await User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      })

      if (!user) {
        return ApiResponse.notFound('User not found')
      }

      return ApiResponse.success(user, 'User updated successfully')
    } catch (error) {
      return handleError(error)
    }
  }

  static async deleteUser(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params
      const user = await User.findByIdAndDelete(id)

      if (!user) {
        return ApiResponse.notFound('User not found')
      }

      return ApiResponse.success(null, 'User deleted successfully')
    } catch (error) {
      return handleError(error)
    }
  }
}
