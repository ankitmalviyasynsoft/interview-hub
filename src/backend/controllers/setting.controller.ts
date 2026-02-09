import { BaseController } from './base.controller'
import { settingService } from '../services/setting.service'
import Setting from '../models/Setting'
import { NextRequest } from 'next/server'
import { ApiResponse } from '../lib/api-response'
import { handleError } from '../lib/error-handler'

export class SettingController extends BaseController<any> {
  constructor() {
    super(settingService, Setting)
  }

  async getByKey(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
    try {
      const { key } = await params
      const value = await settingService.getValue(key)
      if (value === null) return ApiResponse.notFound('Setting not found')
      return ApiResponse.success({ key, value })
    } catch (err) {
      return handleError(err)
    }
  }
}

export const settingController = new SettingController()
