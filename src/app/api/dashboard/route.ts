import { NextRequest } from 'next/server'
import { DashboardController } from '@/backend/controllers/dashboard.controller'
import { authMiddleware } from '@/backend/middleware/auth.middleware'

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
  return DashboardController.getStats()
}
