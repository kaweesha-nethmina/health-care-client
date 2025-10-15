"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, Calendar, FileText, Settings, AlertCircle } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Activity },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

const stats = [
  {
    title: "Total Users",
    value: "1,284",
    change: "+12.5%",
    icon: Users,
    description: "From last month",
  },
  {
    title: "Active Appointments",
    value: "342",
    change: "+8.2%",
    icon: Calendar,
    description: "This week",
  },
  {
    title: "Medical Records",
    value: "5,678",
    change: "+23.1%",
    icon: FileText,
    description: "Total records",
  },
  {
    title: "System Alerts",
    value: "12",
    change: "-4.3%",
    icon: AlertCircle,
    description: "Pending issues",
  },
]

const appointmentData = [
  { name: "Mon", appointments: 45 },
  { name: "Tue", appointments: 52 },
  { name: "Wed", appointments: 48 },
  { name: "Thu", appointments: 61 },
  { name: "Fri", appointments: 55 },
  { name: "Sat", appointments: 38 },
  { name: "Sun", appointments: 25 },
]

const userGrowthData = [
  { month: "Jan", users: 850 },
  { month: "Feb", users: 920 },
  { month: "Mar", users: 1050 },
  { month: "Apr", users: 1150 },
  { month: "May", users: 1220 },
  { month: "Jun", users: 1284 },
]

const recentActivities = [
  {
    id: 1,
    action: "New user registered",
    user: "Dr. James Wilson",
    role: "Doctor",
    time: "5 minutes ago",
  },
  {
    id: 2,
    action: "Appointment scheduled",
    user: "John Doe",
    role: "Patient",
    time: "15 minutes ago",
  },
  {
    id: 3,
    action: "Medical record updated",
    user: "Nurse Mary Johnson",
    role: "Nurse",
    time: "1 hour ago",
  },
  {
    id: 4,
    action: "System backup completed",
    user: "System",
    role: "Automated",
    time: "2 hours ago",
  },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">System overview and management</p>
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
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-secondary" : "text-destructive"}`}
                    >
                      {stat.change}
                    </span>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Appointments Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Appointments</CardTitle>
              <CardDescription>Appointment trends for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Total registered users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--secondary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user} • {activity.role}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
