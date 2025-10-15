"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Activity, FileText, User, Plus, Clock, MapPin, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { PatientService } from "@/lib/services"
import { useAuth } from "@/contexts/auth-context"

interface Appointment {
  id: number
  doctor_id: number
  doctor_name?: string
  doctor_specialty?: string
  appointment_date: string
  status: string
  created_at?: string
  updated_at?: string
}

export default function AppointmentsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        setError(null)
        
        const response = await PatientService.getAppointmentHistory()
        if (response.data) {
          setAppointments(response.data)
        }
      } catch (err) {
        console.error("Error fetching appointments:", err)
        setError("Failed to load appointments. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [user])

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Format time for display
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Get status color variant
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  // Filter appointments based on status
  const upcomingAppointments = appointments.filter((apt) => 
    new Date(apt.appointment_date) > new Date() && apt.status !== "cancelled"
  )
  
  const pastAppointments = appointments.filter((apt) => 
    new Date(apt.appointment_date) <= new Date() || apt.status === "completed" || apt.status === "cancelled"
  )

  if (loading) {
    return (
      <DashboardLayout role="patient">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Appointments</h1>
              <p className="text-muted-foreground mt-1">Loading your appointments...</p>
            </div>
            <Button asChild>
              <Link href="/patient/appointments/book">
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Link>
            </Button>
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
      <DashboardLayout role="patient">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Appointments</h1>
            </div>
            <Button asChild>
              <Link href="/patient/appointments/book">
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Link>
            </Button>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Activity className="h-16 w-16 text-destructive/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Appointments</h3>
              <p className="text-muted-foreground text-center mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Appointments</h1>
            <p className="text-muted-foreground mt-1">Manage your healthcare appointments</p>
          </div>
          <Button asChild>
            <Link href="/patient/appointments/book">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingAppointments.length > 0 ? (
              <div className="grid gap-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.doctor_name || "Doctor"}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.doctor_specialty || "Specialty"}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(appointment.appointment_date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatTime(appointment.appointment_date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              Location not specified
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    You don't have any scheduled appointments at the moment
                  </p>
                  <Button asChild>
                    <Link href="/patient/appointments/book">Book an Appointment</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {pastAppointments.length > 0 ? (
              <div className="grid gap-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-8 w-8 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.doctor_name || "Doctor"}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.doctor_specialty || "Specialty"}</p>
                            </div>
                            <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(appointment.appointment_date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatTime(appointment.appointment_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Past Appointments</h3>
                  <p className="text-muted-foreground text-center">Your appointment history will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}