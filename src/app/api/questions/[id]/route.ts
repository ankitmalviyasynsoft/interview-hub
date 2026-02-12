import { NextRequest } from 'next/server'
import { questionController } from '@/backend/controllers/question.controller'
import { ApiResponse } from '@/backend/lib/api-response'
import { authMiddleware, AuthUser } from '@/backend/middleware/auth.middleware'

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question details
 *       404:
 *         description: Question not found
 *   put:
 *     tags:
 *       - Questions
 *     summary: Update a question
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               modelAnswer:
 *                 type: string
 *               targetCompanies:
 *                 type: array
 *                 items:
 *                   type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               complexity:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *               experience:
 *                 type: string
 *     responses:
 *       200:
 *         description: Question updated
 *       404:
 *         description: Question not found
 *   delete:
 *     tags:
 *       - Questions
 *     summary: Delete a question
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question deleted
 *       404:
 *         description: Question not found
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // We can make this protected if needed, but usually list is public
  // or restricted to authenticated users.
  // Given the context, let's allow public access for reading.
  return questionController.getOne(req, { params })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authMiddleware(req)
    if (auth instanceof Response) return auth

    const user = auth as AuthUser
    if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
      return ApiResponse.forbidden('You do not have permission to update a question')
    }

    return questionController.update(req, { params })
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authMiddleware(req)
    if (auth instanceof Response) return auth

    const user = auth as AuthUser
    if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
      return ApiResponse.forbidden('You do not have permission to delete a question')
    }

    return questionController.delete(req, { params })
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}
