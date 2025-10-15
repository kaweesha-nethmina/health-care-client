"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Users, Calendar, FileText, Settings, Download, TrendingUp } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Activity },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

const reports = [
  {
    id: 1,
    title: "Monthly User Activity Report",
    description: "Comprehensive overview of user registrations and activity",
    date: "October 2025",
    type: "User Analytics",
  },
  {
    id: 2,
    title: "Appointment Statistics",
    description: "Detailed breakdown of appointments by department and status",
    date: "October 2025",
    type: "Appointments",
  },
  {
    id: 3,
    title: "Medical Records Summary",
    description: "Total records created and updated across all departments",
    date: "October 2025",
    type: "Medical Records",
  },
  {
    id: 4,
    title: "System Performance Report",
    description: "Server uptime, response times, and system health metrics",
    date: "October 2025",
    type: "System",
  },
]

export default function AdminReportsPage() {
  return (
    <DashboardLayout navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Generate and download system reports</p>
        </div>

        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{report.type}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Period: {report.date}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
