"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { Calendar, Users, Clock, CheckCircle, Search, UserPlus } from "lucide-react"

interface CheckInStats {
  todayCheckIns: number
  pendingCheckIns: number
  completedCheckIns: number
  waitingPatients: number
}

interface PendingCheckIn {
  id: string
  patientName: string
  appointmentTime: string
  doctorName: string
  status: string
  arrivalTime: string
}

export default function StaffDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<CheckInStats>({
    todayCheckIns: 0,
    pendingCheckIns: 0,
    completedCheckIns: 0,
    waitingPatients: 0,
  })
  const [pendingCheckIns, setPendingCheckIns] = useState<PendingCheckIn[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch check-in statistics
      const statsResponse = await api.get("/staff/check-ins/stats")
      setStats(statsResponse.data)

      // Fetch pending check-ins
      const checkInsResponse = await api.get("/staff/check-ins/pending")
      setPendingCheckIns(checkInsResponse.data)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckIn = async (checkInId: string) => {
    try {
      await api.post(`/staff/check-ins/${checkInId}/complete`)
      fetchDashboardData()
    } catch (error) {
      console.error("Failed to complete check-in:", error)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await api.get(`/staff/patients/search?q=${searchQuery}`)
      console.log("Search results:", response.data)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  if (loading) {
    return (
      <DashboardLayout role="staff">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayCheckIns}</div>
              <p className="text-xs text-muted-foreground">Total patients today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Check-ins</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingCheckIns}</div>
              <p className="text-xs text-muted-foreground">Awaiting check-in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedCheckIns}</div>
              <p className="text-xs text-muted-foreground">Checked in today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waiting Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.waitingPatients}</div>
              <p className="text-xs text-muted-foreground">In waiting room</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Patient Search */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Patient Search</CardTitle>
            <CardDescription>Search for patients by name, ID, or phone number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Enter patient name, ID, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Check-ins */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Check-ins</CardTitle>
            <CardDescription>Patients waiting to be checked in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingCheckIns.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No pending check-ins</p>
              ) : (
                pendingCheckIns.map((checkIn) => (
                  <div key={checkIn.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{checkIn.patientName}</p>
                        <Badge variant="outline">{checkIn.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Appointment: {checkIn.appointmentTime} with Dr. {checkIn.doctorName}
                      </p>
                      <p className="text-xs text-muted-foreground">Arrived: {checkIn.arrivalTime}</p>
                    </div>
                    <Button onClick={() => handleCheckIn(checkIn.id)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Check In
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
