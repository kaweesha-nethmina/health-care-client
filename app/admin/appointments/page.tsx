"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Calendar, FileText, Settings, Search } from "lucide-react"

const appointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Sarah Johnson",
    date: "2025-10-20",
    time: "10:00 AM",
    status: "confirmed",
    type: "Follow-up",
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Michael Chen",
    date: "2025-10-20",
    time: "11:30 AM",
    status: "confirmed",
    type: "Consultation",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    doctor: "Dr. Sarah Johnson",
    date: "2025-10-21",
    time: "2:00 PM",
    status: "pending",
    type: "Checkup",
  },
  {
    id: 4,
    patient: "Emily Davis",
    doctor: "Dr. Emily Rodriguez",
    date: "2025-10-21",
    time: "3:30 PM",
    status: "confirmed",
    type: "Follow-up",
  },
]

export default function AdminAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Appointments</h1>
          <p className="text-muted-foreground mt-1">View and manage all system appointments</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Appointments List */}
        {filteredAppointments.length > 0 ? (
          <div className="grid gap-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                      <p className="text-sm text-muted-foreground">with {appointment.doctor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{appointment.type}</Badge>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      {appointment.date} at {appointment.time}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Appointments Found</h3>
              <p className="text-muted-foreground text-center">
                {searchQuery ? "Try adjusting your search" : "No appointments scheduled"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}