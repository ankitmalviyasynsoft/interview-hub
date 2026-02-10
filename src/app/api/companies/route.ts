import { NextRequest, NextResponse } from 'next/server'
import { companyController } from '@/backend/controllers/company.controller'
import { authMiddleware, AuthUser } from '@/backend/middleware/auth.middleware'
import { ApiResponse } from '@/backend/lib/api-response'

/**
 * @swagger
 * /api/companies:
 *   get:
 *     tags:
 *       - Company
 *     summary: Get all companies
 *     description: Retrieve a list of all companies with pagination and filtering
 *     responses:
 *       200:
 *         description: List of companies retrieved successfully
 *   post:
 *     tags:
 *       - Company
 *     summary: Create a new company
 *     description: Create a new company (Admin/Staff only)
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
 *               isMNC:
 *                 type: boolean
 *               website:
 *                 type: string
 *               logo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

// GET /api/companies
// Public route to list companies
export async function GET(req: NextRequest) {
  // We can make this protected if needed, but usually list is public
  // or restricted to authenticated users.
  // Given the context, let's allow public access for reading.
  return companyController.getAll(req)
}

// POST /api/companies
// Protected route to create a company (Admin/Staff)
export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await authMiddleware(req)
    if (authResult instanceof Response) return authResult

    const user = authResult as AuthUser

    // 2. Authorize user (Admin or Staff)
    if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
      return ApiResponse.forbidden('You do not have permission to create a company')
    }

    // 3. Create company
    // Validation is handled by Mongoose schema
    return companyController.create(req)
  } catch (error) {
    return ApiResponse.error('Internal Server Error', 500)
  }
}
