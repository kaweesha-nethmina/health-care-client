"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, ClipboardList, Settings, Heart, Thermometer, User, AlertCircle } from "lucide-react"
import Link from "next/link"

const assignedPatients = [
  {
    id: 1,
    name: "John Doe",
    room: "301",
    condition: "Post-surgery recovery",
    priority: "high",
    lastVitals: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    room: "305",
    condition: "Diabetes management",
    priority: "medium",
    lastVitals: "1 hour ago",
  },
  {
    id: 3,
    name: "Robert Johnson",
    room: "310",
    condition: "Asthma monitoring",
    priority: "low",
    lastVitals: "30 minutes ago",
  },
]

const recentActivities = [
  {
    id: 1,
    patient: "John Doe",
    action: "Vital signs recorded",
    time: "10 minutes ago",
  },
  {
    id: 2,
    patient: "Jane Smith",
    action: "Medication administered",
    time: "45 minutes ago",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    action: "Care notes updated",
    time: "1 hour ago",
  },
]

const stats = [
  {
    title: "Assigned Patients",
    value: "12",
    icon: Users,
    description: "Active today",
  },
  {
    title: "Vitals Pending",
    value: "5",
    icon: Heart,
    description: "Need recording",
  },
  {
    title: "Medications Due",
    value: "8",
    icon: AlertCircle,
    description: "Next 2 hours",
  },
  {
    title: "Care Records",
    value: "24",
    icon: ClipboardList,
    description: "Updated today",
  },
]

export default function NurseDashboard() {
  return (
    <DashboardLayout role="nurse">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Welcome Back, Nurse</h1>
          <p className="text-muted-foreground mt-1">Here's your patient care overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Assigned Patients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assigned Patients</CardTitle>
                <CardDescription>Patients under your care</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/nurse/patients">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignedPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{patient.name}</p>
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
                      <p className="text-sm text-muted-foreground">Room {patient.room}</p>
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Last vitals</p>
                    <p className="text-sm font-medium">{patient.lastVitals}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest care actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.patient}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common nursing tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="/nurse/vitals/record" className="flex flex-col items-center gap-2">
                  <Thermometer className="h-6 w-6" />
                  <span>Record Vitals</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="/nurse/medication/administer" className="flex flex-col items-center gap-2">
                  <Heart className="h-6 w-6" />
                  <span>Administer Medication</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="/nurse/care-records/new" className="flex flex-col items-center gap-2">
                  <ClipboardList className="h-6 w-6" />
                  <span>Update Care Notes</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="/nurse/patients" className="flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>View Patients</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}