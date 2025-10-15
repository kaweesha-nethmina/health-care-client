"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Activity, FileText, User, Search, Download, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const medicalRecords = [
  {
    id: 1,
    title: "Annual Physical Examination",
    doctor: "Dr. Sarah Johnson",
    date: "2025-10-10",
    type: "Checkup",
    diagnosis: "Healthy - No concerns",
    prescriptions: "Multivitamin supplement",
  },
  {
    id: 2,
    title: "Blood Test Results",
    doctor: "Dr. Michael Chen",
    date: "2025-10-05",
    type: "Lab Results",
    diagnosis: "All values within normal range",
    prescriptions: "None",
  },
  {
    id: 3,
    title: "Cardiology Consultation",
    doctor: "Dr. Sarah Johnson",
    date: "2025-09-20",
    type: "Consultation",
    diagnosis: "Mild hypertension",
    prescriptions: "Lisinopril 10mg daily",
  },
]

const prescriptions = [
  {
    id: 1,
    medication: "Lisinopril",
    dosage: "10mg daily",
    doctor: "Dr. Sarah Johnson",
    startDate: "2025-09-20",
    endDate: "2026-09-20",
    status: "active",
  },
  {
    id: 2,
    medication: "Multivitamin",
    dosage: "1 tablet daily",
    doctor: "Dr. Sarah Johnson",
    startDate: "2025-10-10",
    endDate: "2026-10-10",
    status: "active",
  },
]

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Medical Records</h1>
          <p className="text-muted-foreground mt-1">Access your complete health history and documents</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="records" className="space-y-6">
          <TabsList>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            {filteredRecords.length > 0 ? (
              <div className="grid gap-4">
                {filteredRecords.map((record) => (
                  <Card key={record.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{record.title}</CardTitle>
                          <CardDescription>
                            {record.doctor} • {record.date}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{record.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Diagnosis</p>
                          <p className="text-sm">{record.diagnosis}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Prescriptions</p>
                          <p className="text-sm">{record.prescriptions}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
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
                    {searchQuery ? "Try adjusting your search" : "Your medical records will appear here"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            {prescriptions.length > 0 ? (
              <div className="grid gap-4">
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
                          <span className="text-muted-foreground">Prescribed by:</span>
                          <span className="font-medium">{prescription.doctor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Date:</span>
                          <span className="font-medium">{prescription.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">End Date:</span>
                          <span className="font-medium">{prescription.endDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Download
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
                  <h3 className="text-lg font-semibold mb-2">No Prescriptions</h3>
                  <p className="text-muted-foreground text-center">Your active prescriptions will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}