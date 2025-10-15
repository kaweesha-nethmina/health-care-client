"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Heart, Activity, Clock, MapPin, User, Plus } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/patient/dashboard", icon: Activity },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Medical Records", href: "/patient/medical-records", icon: FileText },
  { name: "Profile", href: "/patient/profile", icon: User },
]

// Mock data
const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2025-10-20",
    time: "10:00 AM",
    location: "Cardiology Department, Room 301",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "2025-10-25",
    time: "2:30 PM",
    location: "General Medicine, Room 105",
    status: "pending",
  },
]

const recentRecords = [
  {
    id: 1,
    title: "Annual Checkup",
    doctor: "Dr. Sarah Johnson",
    date: "2025-10-10",
    type: "Checkup",
  },
  {
    id: 2,
    title: "Blood Test Results",
    doctor: "Dr. Michael Chen",
    date: "2025-10-05",
    type: "Lab Results",
  },
]

const healthStats = [
  { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal" },
  { label: "Heart Rate", value: "72", unit: "bpm", status: "normal" },
  { label: "Weight", value: "70", unit: "kg", status: "normal" },
  { label: "Temperature", value: "98.6", unit: "°F", status: "normal" },
]

export default function PatientDashboard() {
  return (
    <DashboardLayout navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Welcome Back!</h1>
          <p className="text-muted-foreground mt-1">Here's an overview of your health information</p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Book Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <Link href="/patient/appointments/book">
                <Button variant="link" className="p-0 h-auto text-primary">
                  Schedule Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <Link href="/patient/medical-records">
                <Button variant="link" className="p-0 h-auto text-primary">
                  View Records
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <Link href="/patient/prescriptions">
                <Button variant="link" className="p-0 h-auto text-primary">
                  View All
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emergency</CardTitle>
              <Activity className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 h-auto text-destructive">
                Call 911
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Health Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Health Statistics</CardTitle>
            <CardDescription>Your latest vital signs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {healthStats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">
                      {stat.value}
                      <span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                    {stat.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled visits</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/patient/appointments/book">
                  <Plus className="h-4 w-4 mr-2" />
                  Book
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{appointment.doctor}</p>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {appointment.location}
                    </p>
                  </div>
                </div>
              ))}
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No upcoming appointments</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Medical Records */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Medical Records</CardTitle>
                <CardDescription>Your latest health records</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/patient/medical-records">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentRecords.map((record) => (
                <div key={record.id} className="flex gap-4 p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold">{record.title}</p>
                    <p className="text-sm text-muted-foreground">{record.doctor}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">{record.date}</span>
                      <Badge variant="outline">{record.type}</Badge>
                    </div>
                  </div>
                </div>
              ))}
              {recentRecords.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No medical records yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
