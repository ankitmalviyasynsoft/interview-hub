import { NextRequest } from 'next/server'
import { questionController } from '@/backend/controllers/question.controller'
import { authMiddleware } from '@/backend/middleware/auth.middleware'

/**
 * @swagger
 * /api/questions:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get all questions
 *     description: Retrieve a list of all questions
 *     responses:
 *       200:
 *         description: A list of questions
 *   post:
 *     tags:
 *       - Questions
 *     summary: Create a question
 *     description: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created
 */
export async function GET(req: NextRequest) {
  const auth = await authMiddleware(req)
  if (auth instanceof Response) return auth
  return questionController.getAll(req)
}

export async function POST(req: NextRequest) {
  const auth = await authMiddleware(req)
  if (auth instanceof Response) return auth
  return questionController.create(req)
}
