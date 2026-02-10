import { NextRequest } from 'next/server'
import { categoryController } from '@/backend/controllers/category.controller'
import { authMiddleware, AuthUser } from '@/backend/middleware/auth.middleware'
import { ApiResponse } from '@/backend/lib/api-response'

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 *   put:
 *     tags:
 *       - Category
 *     summary: Update a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       403:
 *         description: Forbidden
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete a category
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
 *         description: Category deleted
 *       403:
 *         description: Forbidden
 */

// GET /api/categories/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return categoryController.getOne(req, { params })
}

// PUT /api/categories/[id]
// Protected (Admin/Staff)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await authMiddleware(req)
    if (authResult instanceof Response) return authResult

    const user = authResult as AuthUser

    // Allow Admin and Staff to update categories
    if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
      return ApiResponse.forbidden('You do not have permission to update this category')
    }

    return categoryController.update(req, { params })
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}

// DELETE /api/categories/[id]
// Protected (Admin solely)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await authMiddleware(req)
    if (authResult instanceof Response) return authResult

    const user = authResult as AuthUser

    // Only Admin can delete categories
    if (user.role !== 'ADMIN') {
      return ApiResponse.forbidden('Only Admins can delete categories')
    }

    return categoryController.delete(req, { params })
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}
