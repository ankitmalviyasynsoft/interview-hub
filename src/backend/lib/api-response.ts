import { NextResponse } from 'next/server'

type ApiResponseOptions = {
  status?: number
  message?: string
  data?: any
  errors?: any
}

export class ApiResponse {
  static success(data: any, message: string = 'Success', status: number = 200) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status },
    )
  }

  static error(message: string = 'Internal Server Error', status: number = 500, errors: any = null) {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      { status },
    )
  }

  static created(data: any, message: string = 'Resource created successfully') {
    return ApiResponse.success(data, message, 201)
  }

  static notFound(message: string = 'Resource not found') {
    return ApiResponse.error(message, 404)
  }

  static badRequest(message: string = 'Bad Request', errors: any = null) {
    return ApiResponse.error(message, 400, errors)
  }

  static unauthorized(message: string = 'Unauthorized') {
    return ApiResponse.error(message, 401)
  }

  static forbidden(message: string = 'Forbidden') {
    return ApiResponse.error(message, 403)
  }
}
