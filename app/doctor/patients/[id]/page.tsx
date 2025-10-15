"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, FileText, Settings, Activity, ArrowLeft, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock patient data
const patient = {
  id: "P001",
  name: "John Doe",
  age: 45,
  gender: "Male",
  dateOfBirth: "1980-05-15",
  phone: "+1234567890",
  email: "john.doe@example.com",
  address: "123 Main St, City, Country",
  bloodType: "O+",
  allergies: "Penicillin",
  emergencyContact: "Jane Doe: +1234567891",
  insurance: "Insurance Co, Policy #12345",
}

const medicalHistory = [
  {
    id: 1,
    date: "2025-10-14",
    diagnosis: "Hypertension - Stage 1",
    treatment: "Prescribed Lisinopril 10mg daily",
    notes: "Patient responding well to medication",
  },
  {
    id: 2,
    date: "2025-09-20",
    diagnosis: "Annual Physical Examination",
    treatment: "Routine checkup completed",
    notes: "All vitals within normal range",
  },
]

const prescriptions = [
  {
    id: 1,
    medication: "Lisinopril",
    dosage: "10mg daily",
    startDate: "2025-10-14",
    endDate: "2026-10-14",
    status: "active",
  },
]

const appointments = [
  {
    id: 1,
    date: "2025-10-20",
    time: "10:00 AM",
    type: "Follow-up",
    status: "scheduled",
  },
]

export default function PatientDetailPage() {
  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/doctor/patients">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-balance">Patient Details</h1>
            <p className="text-muted-foreground mt-1">Complete patient information and medical history</p>
          </div>
          <Button asChild>
            <Link href={`/doctor/patients/${patient.id}/records/new`}>Create Record</Link>
          </Button>
        </div>

        {/* Patient Info Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt={patient.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{patient.name}</h2>
                    <p className="text-muted-foreground">
                      ID: {patient.id} • {patient.age} years • {patient.gender}
                    </p>
                  </div>
                  <Badge>Active Patient</Badge>
                </div>
                <div className="grid gap-3 md:grid-cols-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{patient.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>DOB: {patient.dateOfBirth}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Blood Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{patient.bloodType}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Allergies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{patient.allergies}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{patient.insurance}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for detailed information */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            {medicalHistory.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{record.diagnosis}</CardTitle>
                      <CardDescription>{record.date}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View Full Record
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Treatment</p>
                    <p className="text-sm">{record.treatment}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Notes</p>
                    <p className="text-sm">{record.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{prescription.medication}</h3>
                      <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                    </div>
                    <Badge variant={prescription.status === "active" ? "default" : "secondary"}>
                      {prescription.status}
                    </Badge>
                  </div>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span className="font-medium">{prescription.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span className="font-medium">{prescription.endDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <Badge>{appointment.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}