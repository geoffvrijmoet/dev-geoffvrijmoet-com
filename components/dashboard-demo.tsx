"use client"

import { motion } from "framer-motion"
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp,
  ShoppingCart,
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
    title: "Shopify Apps",
    description: "Custom apps and integrations for Shopify stores",
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

const mockShopifyApps = [
  {
    name: "Inventory Sync Pro",
    description: "Real-time inventory sync across multiple sales channels",
    benefits: ["Prevent overselling", "Automated stock updates", "Channel sync"],
    type: "Custom App",
    integratesWith: ["Amazon", "eBay", "Etsy"]
  },
  {
    name: "Smart Analytics",
    description: "Advanced analytics and reporting for data-driven decisions",
    benefits: ["Customer insights", "Sales forecasting", "Performance tracking"],
    type: "Custom App",
    integratesWith: ["Google Analytics", "Facebook Ads", "Email platforms"]
  },
  {
    name: "Order Automation",
    description: "Streamline your order fulfillment and processing",
    benefits: ["Auto fulfillment", "Shipping rules", "Order routing"],
    type: "Custom App",
    integratesWith: ["3PL services", "Shipping carriers", "ERPs"]
  },
  {
    name: "Customer Loyalty+",
    description: "Boost customer retention with personalized rewards",
    benefits: ["Points system", "VIP tiers", "Automated rewards"],
    type: "Custom App",
    integratesWith: ["Email marketing", "SMS platforms", "CRM systems"]
  }
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

const mockContacts = [
  {
    id: 1,
    name: "Sarah Wilson",
    company: "Tech Solutions Inc",
    email: "sarah@techsolutions.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    lastContact: "2024-03-19",
    tags: ["Enterprise", "High Value"]
  },
  {
    id: 2,
    name: "Michael Chang",
    company: "Digital Dynamics",
    email: "michael@digitaldynamics.com",
    phone: "+1 (555) 234-5678",
    status: "Lead",
    lastContact: "2024-03-18",
    tags: ["Startup", "Web Development"]
  },
  {
    id: 3,
    name: "Emma Roberts",
    company: "Creative Studios",
    email: "emma@creativestudios.com",
    phone: "+1 (555) 345-6789",
    status: "Active",
    lastContact: "2024-03-20",
    tags: ["Design", "Recurring"]
  },
  {
    id: 4,
    name: "James Miller",
    company: "Growth Corp",
    email: "james@growthcorp.com",
    phone: "+1 (555) 456-7890",
    status: "Inactive",
    lastContact: "2024-03-15",
    tags: ["SMB"]
  }
]

const mockActivities = [
  {
    id: 1,
    type: "Email",
    contact: "Sarah Wilson",
    description: "Sent proposal follow-up",
    date: "2024-03-20",
    time: "14:30"
  },
  {
    id: 2,
    type: "Call",
    contact: "Michael Chang",
    description: "Discovery call completed",
    date: "2024-03-20",
    time: "11:00"
  },
  {
    id: 3,
    type: "Meeting",
    contact: "Emma Roberts",
    description: "Project review meeting",
    date: "2024-03-19",
    time: "15:00"
  },
  {
    id: 4,
    type: "Note",
    contact: "James Miller",
    description: "Updated requirements doc",
    date: "2024-03-19",
    time: "09:15"
  }
]

const crmStats = [
  {
    title: "Total Contacts",
    value: "847",
    change: "+23",
    icon: Users
  },
  {
    title: "Active Leads",
    value: "245",
    change: "+12%",
    icon: TrendingUp
  },
  {
    title: "Deals Closed",
    value: "$128.5k",
    change: "+18%",
    icon: DollarSign
  },
  {
    title: "Tasks Due",
    value: "24",
    change: "-3",
    icon: MessageSquare
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
            <h2 className="text-2xl font-heading font-bold text-center mb-6">Tools I build</h2>
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
                <div></div>
                <div></div>
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

          {/* Shopify Apps Demo */}
          {selectedApp === "ecommerce" && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-zinc-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-heading font-bold">Custom Shopify Apps</h2>
                <div className="flex items-center gap-4">
                  <button className="text-sm px-3 py-1 rounded-md bg-primary text-white">
                    Request Custom App
                  </button>
                </div>
              </div>

              {/* Example Apps */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockShopifyApps.map((app) => (
                    <div key={app.name} className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-lg mb-2">{app.name}</h4>
                            <p className="text-muted-foreground mb-4">{app.description}</p>
                          </div>
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {app.type}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Key Benefits</h5>
                            <div className="flex flex-wrap gap-2">
                              {app.benefits.map((benefit, i) => (
                                <span
                                  key={i}
                                  className="inline-block px-2 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs"
                                >
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium mb-2">Integrates With</h5>
                            <div className="flex flex-wrap gap-2">
                              {app.integratesWith.map((integration, i) => (
                                <span
                                  key={i}
                                  className="inline-block px-2 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs"
                                >
                                  {integration}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Overview */}
              <div>
                <h3 className="text-lg font-medium mb-4">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-lg border border-zinc-200">
                    <div className="text-primary mb-4">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <h4 className="font-medium mb-2">1. Consultation</h4>
                    <p className="text-sm text-muted-foreground">We discuss your needs and plan the perfect solution for your store</p>
                  </div>
                  <div className="p-6 rounded-lg border border-zinc-200">
                    <div className="text-primary mb-4">
                      <Store className="w-8 h-8" />
                    </div>
                    <h4 className="font-medium mb-2">2. Development</h4>
                    <p className="text-sm text-muted-foreground">Custom app built specifically for your business requirements</p>
                  </div>
                  <div className="p-6 rounded-lg border border-zinc-200">
                    <div className="text-primary mb-4">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h4 className="font-medium mb-2">3. Integration</h4>
                    <p className="text-sm text-muted-foreground">Seamless deployment and ongoing support for your custom app</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CRM Demo */}
          {selectedApp === "crm" && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-zinc-200">
              {/* CRM Header */}
              <div className="flex items-center justify-between mb-8">
                <div></div>
                <div></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {crmStats.map((stat, index) => (
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

              {/* Contacts and Activities Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Contacts List */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Contacts</h3>
                    <div className="flex gap-2">
                      <button className="text-sm px-3 py-1 rounded-md bg-primary text-white">
                        + Add Contact
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Company</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Tags</th>
                          <th className="text-left py-3 px-4 font-medium">Last Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockContacts.map((contact) => (
                          <tr key={contact.id} className="border-b">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-sm text-muted-foreground">{contact.email}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{contact.company}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  contact.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : contact.status === "Lead"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-zinc-100 text-zinc-800"
                                }`}
                              >
                                {contact.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-1 flex-wrap">
                                {contact.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="inline-block px-2 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4">{contact.lastContact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Activities */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {mockActivities.map((activity) => (
                      <div key={activity.id} className="p-4 rounded-lg border border-zinc-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="inline-block px-2 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs mb-2">
                              {activity.type}
                            </span>
                            <h4 className="font-medium">{activity.contact}</h4>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{activity.date}</div>
                            <div>{activity.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other app types */}
          {selectedApp !== "dashboard" && selectedApp !== "ecommerce" && selectedApp !== "booking" && selectedApp !== "crm" && (
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