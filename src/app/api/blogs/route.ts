import { NextRequest } from 'next/server'
import { blogController } from '@/backend/controllers/blog.controller'
import { ApiResponse } from '@/backend/lib/api-response'
import { authMiddleware, AuthUser } from '@/backend/middleware/auth.middleware'

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs with pagination and filtering
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
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: A list of blogs
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Create a blog
 *     description: Create a new blog post
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
 *               - content
 *               - excerpt
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               author:
 *                 type: string
 *                 description: Author name (Admin or Staff name)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 default: draft
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Blog created
 *       403:
 *         description: Forbidden
 */
export async function GET(req: NextRequest) {
  return blogController.getAll(req)
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authMiddleware(req)
    if (auth instanceof Response) return auth

    const user = auth as AuthUser
    if (user.role !== 'ADMIN') {
      return ApiResponse.forbidden('Only Admins can create blogs')
    }

    return blogController.create(req)
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}
