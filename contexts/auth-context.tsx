"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { type User, type AuthState, getAuthData, saveAuthData, clearAuthData, getRoleDashboardPath } from "@/lib/auth"
import { ApiClient } from "@/lib/api"

// Define the response types for authentication endpoints
interface LoginResponse {
  message: string
  token: string
  user: User
}

interface RegisterResponse {
  message: string
  user: User
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, name: string, password: string, role: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Load auth data from localStorage on mount
    const data = getAuthData()
    setAuthState(data)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log("[v0] Attempting login for:", email);
      // Use the correct backend endpoint
      const response = await ApiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      })

      console.log("[v0] Login response:", response);
      
      // The response contains the actual API response with token and user directly
      // Since we've updated the API client to return data directly, we can access it as response
      if (response && response.token && response.user) {
        const { token, user } = response as LoginResponse
        console.log("[v0] Saving auth data for user:", user);
        saveAuthData(token, user)
        
        // Verify that data was saved
        const savedData = getAuthData();
        console.log("[v0] Saved auth data:", savedData);
        
        setAuthState({ user, token, isAuthenticated: true })
        console.log("[v0] Auth state updated");

        // Redirect based on role
        const dashboardPath = getRoleDashboardPath(user.role)
        console.log("[v0] Redirecting to:", dashboardPath)
        router.push(dashboardPath)
      } else {
        console.log("[v0] Login failed - no data in response");
        throw new Error(response.error || "Invalid credentials")
      }
    } catch (error) {
      console.error("[v0] Login failed:", error)
      // More specific error handling
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Login failed. Please check your credentials and try again.")
      }
    }
  }

  const register = async (email: string, name: string, password: string, role: string) => {
    try {
      console.log("[v0] Attempting registration for:", email);
      // Use the correct backend endpoint
      const response = await ApiClient.post<RegisterResponse>("/auth/register", {
        email,
        name,
        password,
        role,
      })

      if (response && response.user) {
        // Response contains the user data directly
        const { user } = response as RegisterResponse
        console.log("[v0] Registration successful, logging in...");
        // After registration, automatically log in
        await login(email, password)
      } else {
        console.log("[v0] Registration failed - no data in response");
        throw new Error(response.error || "Registration failed")
      }
    } catch (error) {
      console.error("[v0] Registration failed:", error)
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Registration failed. Please try again.")
      }
    }
  }

  const logout = () => {
    clearAuthData()
    setAuthState({ user: null, token: null, isAuthenticated: false })
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}