"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Activity, User } from "lucide-react"
import Link from "next/link"
import { AdminService, AdminUser } from "@/lib/services/admin-service"

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true)
        const response = await AdminService.getUserById(params.id)
        if (response.success && response.data) {
          setUser(response.data)
        } else {
          setError("Failed to fetch user details.")
        }
      } catch (err) {
        console.error(err)
        setError("An error occurred while fetching user details.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [params.id])

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "doctor":
        return "default"
      case "nurse":
        return "secondary"
      case "patient":
        return "outline"
      case "staff":
        return "outline"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return (
      <DashboardLayout role="admin">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Activity className="h-16 w-16 text-muted-foreground/50 mb-4 animate-spin" />
              <h3 className="text-lg font-semibold mb-2">Loading User Details...</h3>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !user) {
    return (
      <DashboardLayout role="admin">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <User className="h-16 w-16 text-destructive/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error</h3>
              <p className="text-muted-foreground text-center">{error || "User not found"}</p>
              <Button asChild className="mt-4">
                <Link href="/admin/users">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Users
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="admin">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Link>
          </Button>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Join Date</h4>
                <p>{user.joinDate || "Not available"}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">User ID</h4>
                <p>{user.id}</p>
              </div>
              {/* Add more user details as needed */}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button>Edit User</Button>
              <Button variant="outline">Reset Password</Button>
              <Button variant="destructive">Delete User</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}