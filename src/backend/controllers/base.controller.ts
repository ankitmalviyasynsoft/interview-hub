import { NextRequest } from 'next/server'
import { BaseService } from '../services/base.service'
import { ApiResponse } from '../lib/api-response'
import { handleError } from '../lib/error-handler'
import { ApiFeatures } from '../lib/api-features'
import { Model } from 'mongoose'

export class BaseController<T extends any> {
  constructor(
    private service: BaseService<any>,
    private model: Model<any>,
  ) {}

  async getAll(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url)
      const queryObj = Object.fromEntries(searchParams.entries())

      // Use the model directly for ApiFeatures for now, as service abstraction is simple
      const features = new ApiFeatures(this.model.find(), queryObj).filter().sort().limitFields().paginate()

      const data = await features.query
      const total = await this.model.countDocuments((features as any).queryString)

      return ApiResponse.success({
        results: data.length,
        total,
        data,
      })
    } catch (error) {
      return handleError(error)
    }
  }

  async create(req: NextRequest) {
    try {
      const body = await req.json()
      const item = await this.service.create(body)
      return ApiResponse.created(item)
    } catch (error) {
      return handleError(error)
    }
  }

  async getOne(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params
      const item = await this.service.findById(id)
      if (!item) return ApiResponse.notFound()
      return ApiResponse.success(item)
    } catch (error) {
      return handleError(error)
    }
  }

  async update(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params
      const body = await req.json()
      const item = await this.service.update(id, body)
      if (!item) return ApiResponse.notFound()
      return ApiResponse.success(item)
    } catch (error) {
      return handleError(error)
    }
  }

  async delete(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params
      const item = await this.service.delete(id)
      if (!item) return ApiResponse.notFound()
      return ApiResponse.success(null, 'Deleted successfully')
    } catch (error) {
      return handleError(error)
    }
  }
}
