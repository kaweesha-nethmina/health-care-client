// Healthcare manager service for handling manager-related API calls
import { api, ApiResponse } from "@/lib/api"

export class ManagerService {
  // View healthcare data and analytics
  static async getData(): Promise<ApiResponse<any>> {
    return api.get<any>("/manager/data")
  }

  // Get resource utilization
  static async getResources(): Promise<ApiResponse<any>> {
    return api.get<any>("/manager/resources")
  }
}