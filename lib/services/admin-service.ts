// lib/services/admin-service.ts
import { api, ApiResponse } from "@/lib/api"

// AdminUser interface
export interface AdminUser {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  joinDate: string
}

// User creation interface
export interface CreateUserRequest {
  email: string
  name: string
  role: string
  password: string
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  recentActivities: {
    id: string
    action: string
    user: string
    timestamp: string
    details: string
  }[]
}

export class AdminService {
  // Get dashboard statistics
  static async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      // Get users count first
      const usersResponse = await this.getAllUsers();
      const users = usersResponse.success && Array.isArray(usersResponse.data) ? usersResponse.data : [];
      
      // Calculate stats
      const totalUsers = users.length;
      const activeUsers = users.filter(user => user.status === 'active').length;
      
      // For now, generate recent activities from users
      const recentActivities = (users ?? []).slice(0, 5).map(user => ({
        id: user.id.toString(),
        action: 'User Created',
        user: user.name,
        timestamp: user.joinDate,
        details: `Role: ${user.role}`
      }));

      return {
        success: true,
        data: {
          totalUsers,
          activeUsers,
          recentActivities
        }
      };
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
      return {
        success: false,
        error: "Failed to fetch dashboard statistics",
        data: {
          totalUsers: 0,
          activeUsers: 0,
          recentActivities: []
        }
      };
    }
  }

  // Create user with error handling
  static async createUser(data: CreateUserRequest): Promise<ApiResponse<AdminUser>> {
    try {
      const response = await api.post<AdminUser>("/admin/create-user", data)
      // If backend returns 204 No Content, treat as success
      if ((response as any)?.status === 204 || (!response.data && !response.error)) {
        return { success: true, data: undefined }
      }
      return { success: true, data: response.data }
    } catch (err: any) {
      console.error("Failed to create user:", err)

      // Check for duplicate email in multiple possible error locations
      const errorMessages = [
        err?.message,
        err?.response?.data?.error,
        err?.response?.data?.message,
        err?.error
      ].filter(Boolean).map(msg => msg.toLowerCase());

      if (errorMessages.some(msg => 
        msg.includes("duplicate key value") || 
        msg.includes("users_email_key") ||
        msg.includes("already registered")
      )) {
        return { 
          success: false, 
          error: "This email address is already registered in the system."
        }
      }

      // Always fallback to generic error if nothing specific is found
      let errorMessage = "Failed to create user. Please try again."
      if (err?.response?.data?.error && typeof err.response.data.error === "string") {
        errorMessage = err.response.data.error
      } else if (err?.message && typeof err.message === "string" && err.message !== "An error occurred") {
        errorMessage = err.message
      }
      return { success: false, data: undefined, error: errorMessage }
    }
  }

  // Get all users
  static async getAllUsers(): Promise<ApiResponse<AdminUser[]>> {
    try {
      const response = await api.get<AdminUser[]>("/admin/users")
      console.log('AdminService Response:', response) // Debug log
      
      // Handle different response formats
      let users: AdminUser[] = []
      if (Array.isArray(response)) {
        users = response
      } else if (Array.isArray(response.data)) {
        users = response.data
      } else if (response.success && Array.isArray(response.data)) {
        users = response.data
      }

      return { success: true, data: users }
    } catch (err) {
      console.error("Failed to fetch users:", err)
      return { success: false, data: [], error: "Failed to fetch users." }
    }
  }

  // Get user by ID
  static async getUserById(id: string): Promise<ApiResponse<AdminUser>> {
    try {
      const response = await api.get<AdminUser>(`/admin/get-user?id=${id}`)
      
      if (response.data) {
        return { 
          success: true, 
          data: {
            id: response.data.id,
            name: response.data.name || '',
            email: response.data.email || '',
            role: response.data.role || 'user',
            status: response.data.status || 'active',
            joinDate: response.data.joinDate || new Date().toISOString().split('T')[0]
          }
        }
      }
      
      return { success: false, data: undefined, error: "User not found" }
    } catch (err) {
      console.error("Failed to fetch user details:", err)
      return { success: false, data: undefined, error: "Failed to fetch user details." }
    }
  }

  // Delete user by ID
  static async deleteUser(id: string): Promise<ApiResponse<null>> {
    // Some backends use different routes for delete. Try common variants.
    let lastError: any = null

    // 1) DELETE /admin/users/:id
    try {
      console.debug('Attempting DELETE /admin/users/:id', id)
      const response = await api.delete(`/admin/users/${id}`)
      console.debug('Response for DELETE /admin/users/:id', response)
      if ((response as any)?.status === 204 || response?.success || !response?.error) {
        return { success: true, data: null }
      }
      lastError = response
    } catch (err) {
      console.debug('Error for DELETE /admin/users/:id', err)
      lastError = err
    }

    // 2) DELETE /admin/user?id=:id
    try {
      console.debug('Attempting DELETE /admin/user?id=', id)
      const response = await api.delete(`/admin/user?id=${id}`)
      console.debug('Response for DELETE /admin/user?id=', response)
      if ((response as any)?.status === 204 || response?.success || !response?.error) {
        return { success: true, data: null }
      }
      lastError = response
    } catch (err) {
      console.debug('Error for DELETE /admin/user?id=', err)
      lastError = err
    }

    // 3) DELETE /admin/delete-user?id=:id
    try {
      console.debug('Attempting DELETE /admin/delete-user?id=', id)
      const response = await api.delete(`/admin/delete-user?id=${id}`)
      console.debug('Response for DELETE /admin/delete-user?id=', response)
      if ((response as any)?.status === 204 || response?.success || !response?.error) {
        return { success: true, data: null }
      }
      lastError = response
    } catch (err) {
      console.debug('Error for DELETE /admin/delete-user?id=', err)
      lastError = err
    }

    // 4) POST /admin/delete-user { id }
    try {
      console.debug('Attempting POST /admin/delete-user', id)
      const response = await api.post(`/admin/delete-user`, { id })
      console.debug('Response for POST /admin/delete-user', response)
      if ((response as any)?.status === 204 || response?.success || !response?.error) {
        return { success: true, data: null }
      }
      lastError = response
    } catch (err) {
      console.debug('Error for POST /admin/delete-user', err)
      lastError = err
    }

    // 5) POST /admin/users/delete { id }
    try {
      console.debug('Attempting POST /admin/users/delete', id)
      const response = await api.post(`/admin/users/delete`, { id })
      console.debug('Response for POST /admin/users/delete', response)
      if ((response as any)?.status === 204 || response?.success || !response?.error) {
        return { success: true, data: null }
      }
      lastError = response
    } catch (err) {
      console.debug('Error for POST /admin/users/delete', err)
      lastError = err
    }

    console.error('Failed to delete user, all attempts failed:', lastError)
    const msg = lastError?.response?.data?.error || lastError?.message || lastError?.error || 'Failed to delete user.'
    return { success: false, data: null, error: msg }
  }
}
