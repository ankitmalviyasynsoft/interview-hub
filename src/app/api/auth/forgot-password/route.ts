import { AuthController } from '@/backend/controllers/auth.controller'

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Forgot Password
 *     description: Request a password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset token sent
 *       404:
 *         description: User not found
 */
export async function POST(req: Request) {
  return AuthController.forgotPassword(req as any)
}
