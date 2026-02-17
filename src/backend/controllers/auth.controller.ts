import { NextRequest } from 'next/server'
import { UserService } from '../services/user.service'
import Role, { defaultRoles } from '../models/Role'
import { ApiResponse } from '../lib/api-response'
import { handleError } from '../lib/error-handler'
import { signToken, verifyToken } from '../lib/auth'
import { authMiddleware } from '../middleware/auth.middleware'

import crypto from 'crypto'

export class AuthController {
  static async register(req: NextRequest) {
    try {
      const body = await req.json()
      const { name, email, password, occupation } = body

      const existingUser = await UserService.findUserByEmail(email)
      if (existingUser) {
        return ApiResponse.badRequest('User already exists')
      }

      const userRole = await Role.findOne({ name: defaultRoles[0] })
      if (!userRole) {
        return ApiResponse.error('Default role not found', 500)
      }

      const user = await UserService.createUser({ name, email, password, role: userRole._id, occupation })

      // Remove password from response
      const userObj = user.toObject()
      delete userObj.password

      return ApiResponse.created(userObj, 'User registered successfully')
    } catch (error) {
      return handleError(error)
    }
  }

  static async login(req: NextRequest) {
    try {
      const body = await req.json()
      const { email, password } = body

      if (!email || !password) {
        return ApiResponse.badRequest('Please provide email and password')
      }

      const user = await UserService.findUserByEmail(email, true)

      if (!user || !(await user.comparePassword(password))) {
        return ApiResponse.unauthorized('Invalid credentials')
      }

      const token = signToken({ id: user._id, email: user.email, role: user.role.name })

      const userObj = user.toObject()
      delete userObj.password

      return ApiResponse.success({ user: userObj, token }, 'Login successful')
    } catch (error) {
      return handleError(error)
    }
  }

  static async forgotPassword(req: NextRequest) {
    try {
      const { email } = await req.json()
      const user = await UserService.findUserByEmail(email)

      if (!user) {
        return ApiResponse.notFound('There is no user with that email')
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex')

      // Hash token and set files
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

      // Set expire to 10 minutes
      user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000)

      await user.save({ validateBeforeSave: false })

      // MOCK: Send email
      // In production, use nodemailer

      return ApiResponse.success({ resetToken }, 'Email sent (mocked: returns token)')
    } catch (error) {
      return handleError(error)
    }
  }

  static async resetPassword(req: NextRequest) {
    try {
      const { token, password } = await req.json()

      // Get hashed token
      const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

      const user = await UserService.findUserByToken(resetPasswordToken)

      if (!user) {
        return ApiResponse.badRequest('Invalid token or token has expired')
      }

      // Set new password
      user.password = password
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      const jwtToken = signToken({ id: user._id, email: user.email, role: user.role.name })

      return ApiResponse.success({ token: jwtToken }, 'Password updated successfully')
    } catch (error) {
      return handleError(error)
    }
  }

  static async getProfile(req: NextRequest) {
    try {
      const authResult = await authMiddleware(req)
      if (authResult instanceof Response) {
        return authResult
      }

      const user = await UserService.findUserById(authResult.id)
      if (!user) {
        return ApiResponse.notFound('User not found')
      }

      const userObj = user.toObject()
      delete userObj.password
      delete userObj.resetPasswordToken
      delete userObj.resetPasswordExpire

      return ApiResponse.success(userObj, 'Profile retrieved successfully')
    } catch (error) {
      return handleError(error)
    }
  }
}
