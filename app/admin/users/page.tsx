"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Calendar, FileText, Settings, Search, Plus, MoreVertical, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { AdminService } from "@/lib/services/admin-service"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await AdminService.getAllUsers()
        if (response.success && Array.isArray(response.data)) {
          setUsers(response.data.map((user: any) => ({
            ...user,
            joinDate: user.joinDate || new Date().toISOString(),
          })))
        } else {
          setError(response.error || "Failed to fetch users.")
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch users.")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === "all" || user.role === activeTab

    return matchesSearch && matchesTab
  })

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

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage system users and permissions</p>
          </div>
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="doctor">Doctors</TabsTrigger>
            <TabsTrigger value="nurse">Nurses</TabsTrigger>
            <TabsTrigger value="patient">Patients</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {filteredUsers.length > 0 ? (
              <div className="grid gap-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                              <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">Joined: {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
                  <p className="text-muted-foreground text-center">
                    {searchQuery ? "Try adjusting your search" : "No users in this category"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}