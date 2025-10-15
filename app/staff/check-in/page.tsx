"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"
import { Search, CheckCircle } from "lucide-react"

export default function CheckInPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [patientData, setPatientData] = useState<any>(null)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const response = await api.get(`/staff/patients/search?q=${searchQuery}`)
      setPatientData(response.data)
    } catch (error) {
      console.error("Search failed:", error)
      setPatientData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckIn = async () => {
    if (!patientData) return

    try {
      setLoading(true)
      await api.post("/staff/check-ins", {
        patientId: patientData.id,
        notes: notes,
      })
      alert("Patient checked in successfully!")
      setPatientData(null)
      setSearchQuery("")
      setNotes("")
    } catch (error) {
      console.error("Check-in failed:", error)
      alert("Failed to check in patient")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Check-in</h1>
          <p className="text-muted-foreground">Search and check in patients for their appointments</p>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Patient</CardTitle>
            <CardDescription>Enter patient name, ID, or phone number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Patient name, ID, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={loading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Information */}
        {patientData && (
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Verify patient details before check-in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Full Name</Label>
                    <p className="text-lg font-medium">{patientData.name}</p>
                  </div>
                  <div>
                    <Label>Patient ID</Label>
                    <p className="text-lg font-medium">{patientData.id}</p>
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <p className="text-lg font-medium">{patientData.dateOfBirth}</p>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <p className="text-lg font-medium">{patientData.phone}</p>
                  </div>
                </div>

                {patientData.todayAppointment && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Today's Appointment</h3>
                    <p className="text-sm">Time: {patientData.todayAppointment.time}</p>
                    <p className="text-sm">Doctor: Dr. {patientData.todayAppointment.doctorName}</p>
                    <p className="text-sm">Department: {patientData.todayAppointment.department}</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="notes">Check-in Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about the patient's arrival..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button onClick={handleCheckIn} disabled={loading} className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Check-in
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
