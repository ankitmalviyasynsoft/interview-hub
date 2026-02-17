import { AuthController } from '@/backend/controllers/auth.controller'

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get user profile
 *     description: Retrieve the profile of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
export async function GET(req: Request) {
  return AuthController.getProfile(req as any)
}
