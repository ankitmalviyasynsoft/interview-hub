import { NextRequest } from 'next/server'
import { DashboardController } from '@/backend/controllers/dashboard.controller'
import { authMiddleware, AuthUser } from '@/backend/middleware/auth.middleware'
import { ApiResponse } from '@/backend/lib/api-response'

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get dashboard stats
 *     description: Retrieve statistics for the dashboard
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
export async function GET(req: NextRequest) {
  const auth = await authMiddleware(req)
  if (auth instanceof Response) return auth

  const user = auth as AuthUser

  if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
    return ApiResponse.forbidden('Access denied')
  }

  return DashboardController.getStats(user.id, user.role)
}
