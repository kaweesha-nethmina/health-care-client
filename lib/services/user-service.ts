// User service for handling user profile and profile picture API calls
import { api, ApiResponse } from "@/lib/api"

// User profile interface
export interface UserProfile {
  id: number
  email: string
  name: string
  role: string
  profile_picture_url: string | null
  phone_number: string | null
  date_of_birth: string | null
  gender: string | null
  address: string | null
  emergency_contact: string | null
  created_at: string
  updated_at: string
}

// Profile picture response interface
export interface ProfilePictureResponse {
  profile_picture_url: string | null
}

// Update profile request interface
export interface UpdateProfileRequest {
  name?: string
  phone_number?: string | null
  date_of_birth?: string | null
  gender?: string | null
  address?: string | null
  emergency_contact?: string | null
}

export class UserService {
  // Get user profile
  static async getProfile(): Promise<ApiResponse<UserProfile>> {
    return api.get<UserProfile>("/users/profile")
  }

  // Update user profile
  static async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> {
    return api.put<UserProfile>("/users/profile", data)
  }

  // Upload profile picture
  static async uploadProfilePicture(file: File): Promise<ApiResponse<UserProfile & { fileUrl: string }>> {
    const formData = new FormData()
    formData.append("profilePicture", file)
    
    return api.postFormData<UserProfile & { fileUrl: string }>("/users/profile/picture", formData)
  }

  // Update profile picture
  static async updateProfilePicture(file: File): Promise<ApiResponse<UserProfile & { fileUrl: string }>> {
    const formData = new FormData()
    formData.append("profilePicture", file)
    
    return api.putFormData<UserProfile & { fileUrl: string }>("/users/profile/picture", formData)
  }

  // Get own profile picture
  static async getProfilePicture(): Promise<ApiResponse<ProfilePictureResponse>> {
    return api.get<ProfilePictureResponse>("/users/profile/picture")
  }

  // Delete own profile picture
  static async deleteProfilePicture(): Promise<ApiResponse<UserProfile>> {
    return api.delete<UserProfile>("/users/profile/picture")
  }
}