"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, ClipboardList, Settings, Search, Plus, Eye } from "lucide-react"
import Link from "next/link"

const careRecords = [
  {
    id: 1,
    patient: "John Doe",
    patientId: "P001",
    date: "2025-10-15",
    time: "10:30 AM",
    type: "Vital Signs",
    notes: "BP: 130/85, HR: 78, Temp: 98.6°F - Patient stable",
  },
  {
    id: 2,
    patient: "Jane Smith",
    patientId: "P002",
    date: "2025-10-15",
    time: "09:45 AM",
    type: "Medication",
    notes: "Administered insulin as prescribed - No adverse reactions",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    patientId: "P003",
    date: "2025-10-15",
    time: "08:15 AM",
    type: "Care Notes",
    notes: "Patient comfortable, breathing normal - Nebulizer treatment completed",
  },
  {
    id: 4,
    patient: "Emily Davis",
    patientId: "P004",
    date: "2025-10-14",
    time: "04:30 PM",
    type: "Vital Signs",
    notes: "BP: 118/78, HR: 68, Temp: 98.5°F - Migraine improving",
  },
]

export default function CareRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = careRecords.filter(
    (record) =>
      record.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout role="nurse">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Care Records</h1>
            <p className="text-muted-foreground mt-1">View and manage patient care documentation</p>
          </div>
          <Button asChild>
            <Link href="/nurse/care-records/new">
              <Plus className="h-4 w-4 mr-2" />
              New Record
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name, ID, or type..."
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
                      <CardTitle className="text-lg">
                        {record.patient} (ID: {record.patientId})
                      </CardTitle>
                      <CardDescription>
                        {record.date} at {record.time}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{record.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{record.notes}</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/nurse/care-records/${record.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ClipboardList className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Records Found</h3>
              <p className="text-muted-foreground text-center">
                {searchQuery ? "Try adjusting your search" : "Care records will appear here"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}