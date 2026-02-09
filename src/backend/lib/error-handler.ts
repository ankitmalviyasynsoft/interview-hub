import { ApiResponse } from './api-response'

export const handleError = (error: unknown) => {
  console.error('API Error:', error)

  if (error instanceof Error) {
    // Handle Mongoose Validation Errors
    if (error.name === 'ValidationError') {
      const mongooseError = error as any
      const errors: Record<string, string> = {}

      for (const field in mongooseError.errors) {
        errors[field] = mongooseError.errors[field].message
      }
      return ApiResponse.badRequest('Validation Error', errors)
    }

    // Handle Duplicate Key Error (E11000)
    if ((error as any).code === 11000) {
      const field = Object.keys((error as any).keyPattern)[0]
      return ApiResponse.badRequest(`Duplicate value for field: ${field}`)
    }

    return ApiResponse.error(error.message)
  }

  return ApiResponse.error('An unexpected error occurred')
}
