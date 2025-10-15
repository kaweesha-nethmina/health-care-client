// Admin service for handling admin-related API calls
import { api, ApiResponse } from "@/lib/api"
import { User } from "@/lib/auth"

// User creation interface
export interface CreateUserRequest {
  email: string
  name: string
  role: string
  password: string
}

export class AdminService {
  // Create user
  static async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return api.post<User>("/admin/create-user", data)
  }

  // Configure system
  static async configureSystem(data: any): Promise<ApiResponse<any>> {
    return api.post<any>("/admin/configure-system", data)
  }

  // Get all users
  static async getAllUsers(): Promise<ApiResponse<User[]>> {
    return api.get<User[]>("/admin/users")
  }
}