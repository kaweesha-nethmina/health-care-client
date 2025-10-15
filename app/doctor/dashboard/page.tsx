"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, Settings, Clock, User, Activity } from "lucide-react"
import Link from "next/link"
import { DoctorService } from "@/lib/services"
import { useAuth } from "@/contexts/auth-context"

interface Appointment {
  id: number
  patient_id: number
  patient_name?: string
  appointment_date: string
  status: string
  created_at?: string
  updated_at?: string
}

interface Patient {
  id: number
  user_id: number
  name: string
  email: string
  date_of_birth: string
  gender: string
  phone_number: string
  address: string
  created_at: string
  updated_at: string
}

interface DoctorProfile {
  id: number
  user_id: number
  specialty: string
  qualification: string
  schedule: string
  created_at: string
  updated_at: string
}

const stats = [
  {
    title: "Today's Appointments",
    value: "0",
    icon: Calendar,
    description: "Loading...",
  },
  {
    title: "Total Patients",
    value: "0",
    icon: Users,
    description: "Loading...",
  },
  {
    title: "Pending Records",
    value: "0",
    icon: FileText,
    description: "Loading...",
  },
  {
    title: "Avg. Wait Time",
    value: "--",
    icon: Clock,
    description: "Loading...",
  },
]

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([])
  const [recentPatients, setRecentPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<DoctorProfile | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        setError(null)
        
        // Fetch doctor profile
        const profileResponse = await DoctorService.getProfile()
        if (profileResponse.data) {
          setProfile(profileResponse.data)
        }
        
        // Fetch appointments
        const appointmentResponse = await DoctorService.getAppointmentSchedule()
        if (appointmentResponse.data) {
          // Filter for today's appointments
          const today = new Date().toISOString().split('T')[0]
          const todaysAppointments = appointmentResponse.data
            .filter((apt: any) => apt.appointment_date.startsWith(today))
            .slice(0, 4) // Limit to 4 for display
          setTodayAppointments(todaysAppointments)
        }
        
        // For now, we'll use a placeholder for recent patients
        // In a real implementation, you would fetch this from an API
        setRecentPatients([])
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Format time for display
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <DashboardLayout role="doctor">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-balance">Welcome, Doctor</h1>
            <p className="text-muted-foreground mt-1">Loading your dashboard...</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout role="doctor">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-balance">Welcome, Doctor</h1>
          </div>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Activity className="h-16 w-16 text-destructive/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
              <p className="text-muted-foreground text-center mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Welcome, {user?.name || "Doctor"}</h1>
          <p className="text-muted-foreground mt-1">Here's your schedule and patient overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {todayAppointments.filter(a => a.status === 'confirmed').length} confirmed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground mt-1">Loading...</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Records</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground mt-1">Loading...</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground mt-1">Loading...</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Today's Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/doctor/appointments">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patient_name || "Patient"}</p>
                        <p className="text-sm text-muted-foreground">Appointment</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatTime(appointment.appointment_date)}</p>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No appointments scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>Recently treated patients</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/doctor/patients">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPatients.length > 0 ? (
                recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">Patient</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Last visit</p>
                      <p className="text-sm font-medium">--</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No recent patients data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="/doctor/patients/new-record" className="flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Create Medical Record</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="/doctor/prescriptions/new" className="flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Write Prescription</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="/doctor/appointments" className="flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Manage Schedule</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}