import { NextRequest } from 'next/server'
import { verifyToken } from '../lib/auth'
import { ApiResponse } from '../lib/api-response'

export interface AuthUser {
  id: string
  email: string
  role: string
}

export async function authMiddleware(req: NextRequest): Promise<AuthUser | Response> {
  const authHeader = req.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.unauthorized('Missing or invalid token')
  }

  const token = authHeader.split(' ')[1]
  const decoded = verifyToken(token)

  if (!decoded) {
    return ApiResponse.unauthorized('Invalid or expired token')
  }

  // You might want to type check `decoded` more strictly here
  return decoded as AuthUser
}
