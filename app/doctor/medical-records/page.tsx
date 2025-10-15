"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, Settings, Search, Activity, Eye, Plus } from "lucide-react"
import Link from "next/link"

const medicalRecords = [
  {
    id: 1,
    patient: "John Doe",
    patientId: "P001",
    date: "2025-10-14",
    diagnosis: "Hypertension - Stage 1",
    type: "Follow-up",
    status: "completed",
  },
  {
    id: 2,
    patient: "Jane Smith",
    patientId: "P002",
    date: "2025-10-13",
    diagnosis: "Diabetes Type 2 Management",
    type: "Consultation",
    status: "completed",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    patientId: "P003",
    date: "2025-10-12",
    diagnosis: "Asthma Control Assessment",
    type: "Checkup",
    status: "completed",
  },
  {
    id: 4,
    patient: "Emily Davis",
    patientId: "P004",
    date: "2025-10-10",
    diagnosis: "Migraine Evaluation",
    type: "Consultation",
    status: "pending",
  },
]

export default function DoctorMedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Medical Records</h1>
            <p className="text-muted-foreground mt-1">View and manage patient medical records</p>
          </div>
          <Button asChild>
            <Link href="/doctor/medical-records/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Record
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name, ID, or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Records List */}
        {filteredRecords.length > 0 ? (
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{record.diagnosis}</CardTitle>
                      <CardDescription>
                        {record.patient} (ID: {record.patientId}) • {record.date}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{record.type}</Badge>
                      <Badge variant={record.status === "completed" ? "default" : "secondary"}>{record.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/doctor/medical-records/${record.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/doctor/patients/${record.patientId}`}>View Patient</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Records Found</h3>
              <p className="text-muted-foreground text-center">
                {searchQuery ? "Try adjusting your search" : "Medical records will appear here"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}