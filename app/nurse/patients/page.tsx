"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, ClipboardList, Settings, Search, User, Eye, Heart } from "lucide-react"
import Link from "next/link"

const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    room: "301",
    condition: "Post-surgery recovery",
    priority: "high",
    lastVitals: {
      bp: "130/85",
      hr: "78",
      temp: "98.6°F",
      time: "2 hours ago",
    },
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 52,
    room: "305",
    condition: "Diabetes management",
    priority: "medium",
    lastVitals: {
      bp: "125/80",
      hr: "72",
      temp: "98.4°F",
      time: "1 hour ago",
    },
  },
  {
    id: "P003",
    name: "Robert Johnson",
    age: 38,
    room: "310",
    condition: "Asthma monitoring",
    priority: "low",
    lastVitals: {
      bp: "120/75",
      hr: "70",
      temp: "98.2°F",
      time: "30 minutes ago",
    },
  },
  {
    id: "P004",
    name: "Emily Davis",
    age: 29,
    room: "315",
    condition: "Migraine treatment",
    priority: "medium",
    lastVitals: {
      bp: "118/78",
      hr: "68",
      temp: "98.5°F",
      time: "45 minutes ago",
    },
  },
]

export default function NursePatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.room.includes(searchQuery) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout role="nurse">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Patients</h1>
          <p className="text-muted-foreground mt-1">Manage patient care and vital signs</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, room, or condition..."
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
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{patient.name}</h3>
                            <Badge
                              variant={
                                patient.priority === "high"
                                  ? "destructive"
                                  : patient.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {patient.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ID: {patient.id} • Room {patient.room} • {patient.age} years
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Condition:</span>{" "}
                          <span className="font-medium">{patient.condition}</span>
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Last Vitals ({patient.lastVitals.time})</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">BP</p>
                            <p className="font-medium">{patient.lastVitals.bp}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">HR</p>
                            <p className="font-medium">{patient.lastVitals.hr} bpm</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Temp</p>
                            <p className="font-medium">{patient.lastVitals.temp}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" asChild>
                          <Link href={`/nurse/patients/${patient.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/nurse/patients/${patient.id}/vitals`}>
                            <Heart className="h-4 w-4 mr-2" />
                            Record Vitals
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/nurse/patients/${patient.id}/care`}>Update Care</Link>
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
                {searchQuery ? "Try adjusting your search" : "Your assigned patients will appear here"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}