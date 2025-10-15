"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, Settings, Clock, User, Activity } from "lucide-react"
import Link from "next/link"

const todayAppointments = [
  {
    id: 1,
    patient: "John Doe",
    time: "10:00 AM",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Jane Smith",
    time: "11:30 AM",
    type: "Consultation",
    status: "confirmed",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    time: "2:00 PM",
    type: "Checkup",
    status: "pending",
  },
  {
    id: 4,
    patient: "Emily Davis",
    time: "3:30 PM",
    type: "Follow-up",
    status: "confirmed",
  },
]

const recentPatients = [
  {
    id: 1,
    name: "John Doe",
    lastVisit: "2025-10-14",
    condition: "Hypertension",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastVisit: "2025-10-13",
    condition: "Diabetes",
  },
  {
    id: 3,
    name: "Robert Johnson",
    lastVisit: "2025-10-12",
    condition: "Asthma",
  },
]

const stats = [
  {
    title: "Today's Appointments",
    value: "8",
    icon: Calendar,
    description: "4 completed, 4 upcoming",
  },
  {
    title: "Total Patients",
    value: "156",
    icon: Users,
    description: "+12 this month",
  },
  {
    title: "Pending Records",
    value: "5",
    icon: FileText,
    description: "Require attention",
  },
  {
    title: "Avg. Wait Time",
    value: "15 min",
    icon: Clock,
    description: "Below target",
  },
]

export default function DoctorDashboard() {
  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Welcome, Dr. Johnson</h1>
          <p className="text-muted-foreground mt-1">Here's your schedule and patient overview for today</p>
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
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
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
              {recentPatients.map((patient) => (
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
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last visit</p>
                    <p className="text-sm font-medium">{patient.lastVisit}</p>
                  </div>
                </div>
              ))}
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