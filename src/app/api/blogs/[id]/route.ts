import { NextRequest } from 'next/server'
import { blogController } from '@/backend/controllers/blog.controller'
import { ApiResponse } from '@/backend/lib/api-response'
import { authMiddleware, AuthUser } from '@/backend/middleware/auth.middleware'

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get a blog by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog details
 *       404:
 *         description: Blog not found
 *   put:
 *     tags:
 *       - Blogs
 *     summary: Update a blog
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
 *               content:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Blog updated
 *       403:
 *         description: Forbidden
 *   delete:
 *     tags:
 *       - Blogs
 *     summary: Delete a blog
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
 *         description: Blog deleted
 *       403:
 *         description: Forbidden
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return blogController.getOne(req, { params })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authMiddleware(req)
    if (auth instanceof Response) return auth

    const user = auth as AuthUser
    if (user.role !== 'ADMIN') {
      return ApiResponse.forbidden('Only Admins can update blogs')
    }

    return blogController.update(req, { params })
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authMiddleware(req)
    if (auth instanceof Response) return auth

    const user = auth as AuthUser
    if (user.role !== 'ADMIN') {
      return ApiResponse.forbidden('Only Admins can delete blogs')
    }

    return blogController.delete(req, { params })
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}
