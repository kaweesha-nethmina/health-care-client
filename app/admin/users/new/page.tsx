"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Lock, Badge } from "lucide-react"
import { AdminService, AdminUser } from "@/lib/services/admin-service"
import { useRouter } from "next/navigation"

export default function CreateUserPage() {
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  // Fetch all users to prevent duplicate emails
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await AdminService.getAllUsers()
      if (res.success && res.data) setUsers(res.data)
    }
    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    // Frontend check for duplicate email
    if (users.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
      setError("This email is already registered.")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await AdminService.createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
      
      if (response && response.error && response.error.includes("duplicate key value")) {
        setError("This email address is already registered in the system.");
      } else if (response) {
        setSuccess(true)
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
        })
        // Redirect to users page after 2 seconds
        setTimeout(() => {
          router.push("/admin/users")
        }, 2000)
      }
    } catch (err) {
      console.error("Error creating user:", err)
      setError(err instanceof Error ? err.message : "Failed to create user. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout role="admin">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Create New User</h1>
          <p className="text-muted-foreground mt-1">Add a new user to the system</p>
        </div>

        {success && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <p className="text-green-800">User created successfully!</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Enter the details for the new user</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                  <Badge className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Select
                    value={formData.role}
                    onValueChange={value => setFormData({ ...formData, role: value })}
                    required
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="staff">Hospital Staff</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="healthcare_manager">Healthcare Manager</SelectItem>
                      <SelectItem value="system_admin">System Administrator</SelectItem>
                      <SelectItem value="emergency_services">Emergency Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create User"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/users")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
