import { NextRequest } from 'next/server'
import { categoryController } from '@/backend/controllers/category.controller'
import { authMiddleware, AuthUser } from '@/backend/middleware/auth.middleware'
import { ApiResponse } from '@/backend/lib/api-response'

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     description: Retrieve a list of all categories
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *   post:
 *     tags:
 *       - Category
 *     summary: Create a new category
 *     description: Create a new category (Admin/Staff only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

// GET /api/categories
// Public route to list categories
export async function GET(req: NextRequest) {
  return categoryController.getAll(req)
}

// POST /api/categories
// Protected route to create a category (Admin/Staff)
export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await authMiddleware(req)
    if (authResult instanceof Response) return authResult

    const user = authResult as AuthUser

    // 2. Authorize user (Admin or Staff)
    // "staff/categories/add" or "admin/categories/add" implies both can add
    if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
      return ApiResponse.forbidden('You do not have permission to create a category')
    }

    // 3. Create category
    return categoryController.create(req)
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}
