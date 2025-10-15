"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, Settings, Search, User, Activity, Eye } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/doctor/dashboard", icon: Activity },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Medical Records", href: "/doctor/medical-records", icon: FileText },
  { name: "Profile", href: "/doctor/profile", icon: Settings },
]

const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    lastVisit: "2025-10-14",
    condition: "Hypertension",
    status: "active",
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 52,
    gender: "Female",
    lastVisit: "2025-10-13",
    condition: "Diabetes Type 2",
    status: "active",
  },
  {
    id: "P003",
    name: "Robert Johnson",
    age: 38,
    gender: "Male",
    lastVisit: "2025-10-12",
    condition: "Asthma",
    status: "active",
  },
  {
    id: "P004",
    name: "Emily Davis",
    age: 29,
    gender: "Female",
    lastVisit: "2025-10-10",
    condition: "Migraine",
    status: "active",
  },
  {
    id: "P005",
    name: "Michael Brown",
    age: 61,
    gender: "Male",
    lastVisit: "2025-10-08",
    condition: "Arthritis",
    status: "active",
  },
]

export default function DoctorPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout navigation={navigation}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Patients</h1>
            <p className="text-muted-foreground mt-1">Manage your patient records and information</p>
          </div>
          <Button asChild>
            <Link href="/doctor/patients/new">Add Patient</Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, ID, or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Patients List */}
        {filteredPatients.length > 0 ? (
          <div className="grid gap-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ID: {patient.id} • {patient.age} years • {patient.gender}
                          </p>
                        </div>
                        <Badge variant="secondary">{patient.status}</Badge>
                      </div>
                      <div className="grid gap-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Condition:</span>
                          <span className="font-medium">{patient.condition}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Last Visit:</span>
                          <span className="font-medium">{patient.lastVisit}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" asChild>
                          <Link href={`/doctor/patients/${patient.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/doctor/patients/${patient.id}/records`}>Medical Records</Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/doctor/patients/${patient.id}/prescribe`}>Prescribe</Link>
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
              <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Patients Found</h3>
              <p className="text-muted-foreground text-center">
                {searchQuery ? "Try adjusting your search" : "Your patient list will appear here"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
