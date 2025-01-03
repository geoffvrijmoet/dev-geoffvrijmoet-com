"use client"

import { motion } from "framer-motion"
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp,
  ShoppingCart,
  Clock,
  AlertCircle,
  Store,
  Calendar,
  MessageSquare
} from "lucide-react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const appTypes = [
  {
    id: "dashboard",
    title: "Business Dashboard",
    description: "Real-time analytics and business management",
    icon: BarChart3
  },
  {
    id: "ecommerce",
    title: "E-commerce Platform",
    description: "Online store with inventory management",
    icon: Store
  },
  {
    id: "booking",
    title: "Booking System",
    description: "Appointment and reservation management",
    icon: Calendar
  },
  {
    id: "crm",
    title: "CRM",
    description: "Customer relationship management",
    icon: MessageSquare
  }
]

const mockOrders = [
  { id: 1, customer: "John Doe", amount: 156.00, status: "Completed", date: "2024-03-20" },
  { id: 2, customer: "Sarah Smith", amount: 249.99, status: "Processing", date: "2024-03-20" },
  { id: 3, customer: "Mike Johnson", amount: 89.99, status: "Pending", date: "2024-03-19" },
  { id: 4, customer: "Emily Brown", amount: 199.50, status: "Completed", date: "2024-03-19" },
]

const stats = [
  {
    title: "Total Revenue",
    value: "$12,456",
    change: "+12%",
    icon: DollarSign
  },
  {
    title: "Active Users",
    value: "2,345",
    change: "+8%",
    icon: Users
  },
  {
    title: "New Orders",
    value: "145",
    change: "+23%",
    icon: ShoppingCart
  },
  {
    title: "Growth",
    value: "18%",
    change: "+4%",
    icon: TrendingUp
  }
]

export default function DashboardDemo() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedApp, setSelectedApp] = useState("dashboard")
  
  return (
    <div className="py-4 md:py-8 flex justify-center items-center">
      <div className="container px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 0.25
          }}
        >
          {/* App Type Selector */}
          <div className="bg-zinc-100/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-zinc-200 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              {appTypes.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app.id)}
                  className={`text-left p-4 rounded-lg transition-colors ${
                    selectedApp === app.id 
                      ? "bg-white shadow-sm border border-zinc-200" 
                      : "hover:bg-white/50"
                  }`}
                >
                  <app.icon className={`w-6 h-6 mb-2 ${
                    selectedApp === app.id 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`} />
                  <h3 className="font-medium mb-1">{app.title}</h3>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Demo (shown when dashboard is selected) */}
          {selectedApp === "dashboard" && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-zinc-200">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-heading font-bold">Business Dashboard</h2>
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-zinc-100 rounded-md">
                    <Clock className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-zinc-100 rounded-md">
                    <AlertCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-green-500">{stat.change} from last month</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b">
                <button
                  onClick={() => setSelectedTab("overview")}
                  className={`pb-2 px-1 ${
                    selectedTab === "overview"
                      ? "border-b-2 border-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setSelectedTab("orders")}
                  className={`pb-2 px-1 ${
                    selectedTab === "orders"
                      ? "border-b-2 border-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  Recent Orders
                </button>
              </div>

              {/* Tab Content */}
              {selectedTab === "overview" ? (
                <div className="h-[300px] flex items-center justify-center bg-zinc-50 rounded-lg border border-dashed">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Analytics Overview</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4">#{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">${order.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs ${
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Placeholders for other app types */}
          {selectedApp !== "dashboard" && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-zinc-200">
              <div className="h-[600px] flex items-center justify-center bg-zinc-50 rounded-lg border border-dashed">
                <div className="text-center">
                  {(() => {
                    const app = appTypes.find(a => a.id === selectedApp)
                    if (!app) return null
                    const Icon = app.icon
                    return (
                      <>
                        <Icon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">{app.title} Demo Coming Soon</p>
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 