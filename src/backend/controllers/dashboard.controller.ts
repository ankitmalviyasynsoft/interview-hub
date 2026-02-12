import { DashboardService } from '../services/dashboard.service'
import { ApiResponse } from '../lib/api-response'
import { handleError } from '../lib/error-handler'

export class DashboardController {
  static async getStats(userId: string, role: string) {
    try {
      const stats = await DashboardService.getStats(userId, role)
      return ApiResponse.success(stats)
    } catch (error) {
      return handleError(error)
    }
  }
}
