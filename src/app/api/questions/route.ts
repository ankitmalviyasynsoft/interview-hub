import { NextRequest } from 'next/server'
import { questionController } from '@/backend/controllers/question.controller'
import { ApiResponse } from '@/backend/lib/api-response'
import { authMiddleware, AuthUser } from '@/backend/middleware/auth.middleware'

/**
 * @swagger
 * /api/questions:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get all questions
 *     description: Retrieve a list of all questions with pagination and filtering
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of questions
 *   post:
 *     tags:
 *       - Questions
 *     summary: Create a question
 *     description: Create a new question
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - modelAnswer
 *               - experience
 *             properties:
 *               title:
 *                 type: string
 *               modelAnswer:
 *                 type: string
 *               targetCompanies:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Company ObjectId
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Category ObjectId
 *               complexity:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *                 default: Medium
 *               experience:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created
 */
export async function GET(req: NextRequest) {
  return questionController.getAll(req)
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authMiddleware(req)
    if (auth instanceof Response) return auth

    const user = auth as AuthUser
    if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
      return ApiResponse.forbidden('You do not have permission to create a question')
    }

    return questionController.create(req)
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}
