"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, FileText, Settings, Clock, User, Activity, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Dashboard", href: "/doctor/dashboard", icon: Activity },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Medical Records", href: "/doctor/medical-records", icon: FileText },
  { name: "Profile", href: "/doctor/profile", icon: Settings },
]

const appointments = [
  {
    id: 1,
    patient: "John Doe",
    patientId: "P001",
    date: "2025-10-15",
    time: "10:00 AM",
    type: "Follow-up",
    status: "confirmed",
    reason: "Blood pressure check",
    category: "today",
  },
  {
    id: 2,
    patient: "Jane Smith",
    patientId: "P002",
    date: "2025-10-15",
    time: "11:30 AM",
    type: "Consultation",
    status: "confirmed",
    reason: "Diabetes management",
    category: "today",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    patientId: "P003",
    date: "2025-10-15",
    time: "2:00 PM",
    type: "Checkup",
    status: "pending",
    reason: "Annual physical",
    category: "today",
  },
  {
    id: 4,
    patient: "Emily Davis",
    patientId: "P004",
    date: "2025-10-16",
    time: "9:00 AM",
    type: "Follow-up",
    status: "confirmed",
    reason: "Post-surgery checkup",
    category: "upcoming",
  },
  {
    id: 5,
    patient: "Michael Brown",
    patientId: "P005",
    date: "2025-10-16",
    time: "10:30 AM",
    type: "Consultation",
    status: "confirmed",
    reason: "Chest pain evaluation",
    category: "upcoming",
  },
]

export default function DoctorAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("today")

  const todayAppointments = appointments.filter((apt) => apt.category === "today")
  const upcomingAppointments = appointments.filter((apt) => apt.category === "upcoming")

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

  return (
    <DashboardLayout navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your patient appointments and schedule</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4 mt-6">
            {todayAppointments.length > 0 ? (
              <div className="grid gap-4">
                {todayAppointments.map((appointment) => (
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
                              <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                              <p className="text-sm text-muted-foreground">ID: {appointment.patientId}</p>
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
                                  <DropdownMenuItem>View Patient Record</DropdownMenuItem>
                                  <DropdownMenuItem>Start Consultation</DropdownMenuItem>
                                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{appointment.time}</span>
                              <span className="text-muted-foreground">•</span>
                              <Badge variant="outline">{appointment.type}</Badge>
                            </div>
                            <p className="text-muted-foreground">
                              <span className="font-medium">Reason:</span> {appointment.reason}
                            </p>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm">Start Consultation</Button>
                            <Button size="sm" variant="outline">
                              View Records
                            </Button>
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
                  <h3 className="text-lg font-semibold mb-2">No Appointments Today</h3>
                  <p className="text-muted-foreground text-center">You have no scheduled appointments for today</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

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
                              <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                              <p className="text-sm text-muted-foreground">ID: {appointment.patientId}</p>
                            </div>
                            <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                          </div>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{appointment.date}</span>
                              <span className="text-muted-foreground">at</span>
                              <span className="font-medium">{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{appointment.type}</Badge>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{appointment.reason}</span>
                            </div>
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
                  <p className="text-muted-foreground text-center">You have no scheduled appointments coming up</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
