"use client"

import { motion } from "framer-motion"
import { 
  DollarSign, 
  TrendingUp,
  ShoppingCart,
  Edit,
  Plus,
  Calendar,
  X
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type TimeFrame = "today" | "last7" | "thisWeek" | "last30" | "thisMonth" | "thisYear" | "last365" | "allTime"

const timeFrameOptions: { value: TimeFrame; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "last7", label: "Last 7 Days" },
  { value: "thisWeek", label: "This Week" },
  { value: "last30", label: "Last 30 Days" },
  { value: "thisMonth", label: "This Month" },
  { value: "thisYear", label: "This Year" },
  { value: "last365", label: "Last 365 Days" },
  { value: "allTime", label: "All Time" }
]

const mockOrders = [
  { id: 1, customer: "John Doe", amount: 156.00, status: "Completed", date: "2024-03-20" },
  { id: 2, customer: "Sarah Smith", amount: 249.99, status: "Processing", date: "2024-03-20" },
  { id: 3, customer: "Mike Johnson", amount: 89.99, status: "Pending", date: "2024-03-19" },
  { id: 4, customer: "Emily Brown", amount: 199.50, status: "Completed", date: "2024-03-19" },
]

const timeFrameStats: Record<TimeFrame, {
  revenue: { value: string; change: string };
  bookings: { value: string; change: string };
  orders: { value: string; change: string };
  costs: { value: string; change: string };
}> = {
  today: {
    revenue: { value: "$1,245", change: "+8%" },
    bookings: { value: "24", change: "+12%" },
    orders: { value: "12", change: "+20%" },
    costs: { value: "$456", change: "-2%" }
  },
  last7: {
    revenue: { value: "$8,902", change: "+15%" },
    bookings: { value: "156", change: "+10%" },
    orders: { value: "89", change: "+18%" },
    costs: { value: "$2,890", change: "-8%" }
  },
  thisWeek: {
    revenue: { value: "$6,789", change: "+12%" },
    bookings: { value: "134", change: "+5%" },
    orders: { value: "76", change: "+15%" },
    costs: { value: "$2,345", change: "-5%" }
  },
  last30: {
    revenue: { value: "$34,567", change: "+22%" },
    bookings: { value: "678", change: "+25%" },
    orders: { value: "345", change: "+28%" },
    costs: { value: "$12,456", change: "-12%" }
  },
  thisMonth: {
    revenue: { value: "$28,901", change: "+18%" },
    bookings: { value: "567", change: "+20%" },
    orders: { value: "289", change: "+24%" },
    costs: { value: "$9,876", change: "-10%" }
  },
  thisYear: {
    revenue: { value: "$345,678", change: "+45%" },
    bookings: { value: "5,678", change: "+38%" },
    orders: { value: "2,890", change: "+42%" },
    costs: { value: "$123,456", change: "-15%" }
  },
  last365: {
    revenue: { value: "$456,789", change: "+52%" },
    bookings: { value: "6,789", change: "+45%" },
    orders: { value: "3,456", change: "+48%" },
    costs: { value: "$156,789", change: "-18%" }
  },
  allTime: {
    revenue: { value: "$789,012", change: "+156%" },
    bookings: { value: "12,345", change: "+134%" },
    orders: { value: "6,789", change: "+145%" },
    costs: { value: "$234,567", change: "-25%" }
  }
}

type Customer = {
  id: number
  name: string
  email: string
  phone: string
  totalSpent: number
  bookingsCount: number
  lastBooking: string
  status: "Active" | "Inactive"
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    totalSpent: 1250.00,
    bookingsCount: 8,
    lastBooking: "2024-03-18",
    status: "Active" as const
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    totalSpent: 890.50,
    bookingsCount: 5,
    lastBooking: "2024-03-20",
    status: "Active" as const
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 345-6789",
    totalSpent: 450.75,
    bookingsCount: 3,
    lastBooking: "2024-03-15",
    status: "Inactive" as const
  }
]

type Booking = {
  id: number
  customer: string
  service: string
  date: string
  time: string
  duration: string
  status: "Confirmed" | "Pending"
}

const mockBookings: Booking[] = [
  {
    id: 1,
    customer: "John Doe",
    service: "Consultation",
    date: "2024-03-25",
    time: "10:00 AM",
    duration: "1 hour",
    status: "Confirmed" as const
  },
  {
    id: 2,
    customer: "Sarah Smith",
    service: "Follow-up",
    date: "2024-03-26",
    time: "2:30 PM",
    duration: "30 min",
    status: "Pending" as const
  },
  {
    id: 3,
    customer: "Mike Johnson",
    service: "Review",
    date: "2024-03-27",
    time: "11:00 AM",
    duration: "1 hour",
    status: "Confirmed" as const
  }
]

type TabType = "stats" | "customers" | "bookings"

const serviceOptions = [
  "Consultation",
  "Follow-up",
  "Review",
  "Strategy Session",
  "Implementation",
  "Support"
]

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<TabType>("stats")
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("last30")
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: "",
    email: "",
    phone: "",
    status: "Active"
  })
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [editingBookingId, setEditingBookingId] = useState<number | null>(null)
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [newInlineBooking, setNewInlineBooking] = useState<boolean>(false)
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    customer: "",
    service: "",
    date: "",
    time: "",
    duration: "1 hour",
    status: "Pending" as const
  })

  const handleAddCustomer = () => {
    const customer: Customer = {
      id: customers.length + 1,
      name: newCustomer.name || "",
      email: newCustomer.email || "",
      phone: newCustomer.phone || "",
      totalSpent: 0,
      bookingsCount: 0,
      lastBooking: "-",
      status: newCustomer.status as "Active" | "Inactive"
    }
    setCustomers([...customers, customer])
    setNewCustomer({ name: "", email: "", phone: "", status: "Active" })
    setIsAddModalOpen(false)
  }

  const handleEditCustomer = () => {
    if (!editingCustomer) return
    const updatedCustomers = customers.map(c => 
      c.id === editingCustomer.id ? editingCustomer : c
    )
    setCustomers(updatedCustomers)
    setEditingCustomer(null)
    setIsEditModalOpen(false)
  }

  const handleStatusToggle = (customer: Customer) => {
    const updatedCustomers = customers.map(c => 
      c.id === customer.id 
        ? { ...c, status: c.status === "Active" ? ("Inactive" as const) : ("Active" as const) }
        : c
    )
    setCustomers(updatedCustomers)
  }

  const handleBookingStatusToggle = (booking: Booking) => {
    const updatedBookings = bookings.map(b => 
      b.id === booking.id 
        ? { ...b, status: b.status === "Confirmed" ? ("Pending" as const) : ("Confirmed" as const) }
        : b
    )
    setBookings(updatedBookings)
  }

  const handleSaveInlineBooking = (booking: Booking) => {
    if (editingBookingId) {
      const updatedBookings = bookings.map(b => 
        b.id === editingBookingId ? booking : b
      )
      setBookings(updatedBookings)
      setEditingBookingId(null)
    } else {
      setBookings([...bookings, { ...booking, id: bookings.length + 1 }])
    }
    setNewInlineBooking(false)
  }

  const handleCancelEdit = () => {
    setEditingBookingId(null)
    setNewInlineBooking(false)
  }

  const currentStats = [
    {
      title: "Total Revenue",
      value: timeFrameStats[timeFrame].revenue.value,
      change: timeFrameStats[timeFrame].revenue.change,
      icon: DollarSign
    },
    {
      title: "Service Bookings",
      value: timeFrameStats[timeFrame].bookings.value,
      change: timeFrameStats[timeFrame].bookings.change,
      icon: Calendar
    },
    {
      title: "Orders",
      value: timeFrameStats[timeFrame].orders.value,
      change: timeFrameStats[timeFrame].orders.change,
      icon: ShoppingCart
    },
    {
      title: "Costs",
      value: timeFrameStats[timeFrame].costs.value,
      change: timeFrameStats[timeFrame].costs.change,
      icon: TrendingUp
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-100/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-zinc-200"
    >
      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-zinc-200">
        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === "stats"
              ? "bg-white text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Stats
        </button>
        <button
          onClick={() => setActiveTab("customers")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === "customers"
              ? "bg-white text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Customers
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === "bookings"
              ? "bg-white text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Bookings
        </button>
      </div>

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div>
          {/* Time Frame Selector */}
          <div className="mb-6">
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
              className="bg-white border border-zinc-200 text-sm rounded-lg px-3 py-2 focus:ring-primary focus:border-primary outline-none"
            >
              {timeFrameOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {currentStats.map((stat, index) => (
              <Card key={index} className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                  <span className={`text-xs font-medium ${
                    stat.change.startsWith("+") ? "text-emerald-600" : "text-rose-600"
                  }`}>{stat.change}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
            <div className="p-4 border-b border-zinc-200">
              <h3 className="font-medium">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="text-sm">
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">${order.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Completed" 
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === "customers" && (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200">
            <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-medium">Customers</h3>
              <Button size="sm" variant="outline" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Total Spent</th>
                    <th className="px-4 py-3 text-left">Bookings</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="text-sm">
                      <td className="px-4 py-3">{customer.name}</td>
                      <td className="px-4 py-3">{customer.email}</td>
                      <td className="px-4 py-3">${customer.totalSpent.toFixed(2)}</td>
                      <td className="px-4 py-3">{customer.bookingsCount}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleStatusToggle(customer)}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            customer.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-zinc-100 text-zinc-800"
                          }`}
                        >
                          {customer.status}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            setEditingCustomer(customer)
                            setIsEditModalOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Customer Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 w-full max-w-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base font-medium">Add New Customer</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Input
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      placeholder="Name"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      placeholder="Email"
                      type="email"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      placeholder="Phone"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <select
                      value={newCustomer.status}
                      onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value as "Active" | "Inactive" })}
                      className="w-full border border-zinc-200 rounded-lg px-3 py-1.5 text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                    <Button size="sm" onClick={handleAddCustomer}>Add Customer</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Customer Modal */}
          {isEditModalOpen && editingCustomer && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 w-full max-w-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base font-medium">Edit Customer</h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Input
                      value={editingCustomer.name}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      value={editingCustomer.email}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                      type="email"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      value={editingCustomer.phone}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <select
                      value={editingCustomer.status}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value as "Active" | "Inactive" })}
                      className="w-full border border-zinc-200 rounded-lg px-3 py-1.5 text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                    <Button size="sm" onClick={handleEditCustomer}>Save Changes</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200">
          <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
            <h3 className="font-medium">Bookings</h3>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setNewInlineBooking(true)}
              disabled={newInlineBooking || editingBookingId !== null}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {newInlineBooking && (
                  <tr className="text-sm bg-zinc-50/50">
                    <td className="px-4 py-2">
                      <Input
                        placeholder="Customer name"
                        className="text-xs h-7"
                        value={newBooking.customer}
                        onChange={(e) => setNewBooking({ ...newBooking, customer: e.target.value })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        className="w-full border border-zinc-200 rounded-lg px-2 h-7 text-xs"
                        value={newBooking.service}
                        onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                      >
                        <option value="">Select service</option>
                        {serviceOptions.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="date"
                        className="text-xs h-7"
                        value={newBooking.date}
                        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="time"
                        className="text-xs h-7"
                        value={newBooking.time}
                        onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        className="w-full border border-zinc-200 rounded-lg px-2 h-7 text-xs"
                        value={newBooking.duration}
                        onChange={(e) => setNewBooking({ ...newBooking, duration: e.target.value })}
                      >
                        <option value="30 min">30 min</option>
                        <option value="1 hour">1 hour</option>
                        <option value="1.5 hours">1.5 hours</option>
                        <option value="2 hours">2 hours</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        className="w-full border border-zinc-200 rounded-lg px-2 h-7 text-xs"
                        value={newBooking.status}
                        onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value as "Confirmed" | "Pending" })}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveInlineBooking(newBooking as Booking)} 
                          className="h-7 text-xs px-2"
                        >
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleCancelEdit}
                          className="h-7 text-xs px-2"
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
                {bookings.map((booking) => (
                  <tr key={booking.id} className="text-sm">
                    {editingBookingId === booking.id ? (
                      <>
                        <td className="px-4 py-2">
                          <Input
                            className="text-xs h-7"
                            value={editingBooking?.customer}
                            onChange={(e) => setEditingBooking({ ...editingBooking!, customer: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <select
                            className="w-full border border-zinc-200 rounded-lg px-2 h-7 text-xs"
                            value={editingBooking?.service}
                            onChange={(e) => setEditingBooking({ ...editingBooking!, service: e.target.value })}
                          >
                            {serviceOptions.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="date"
                            className="text-xs h-7"
                            value={editingBooking?.date}
                            onChange={(e) => setEditingBooking({ ...editingBooking!, date: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="time"
                            className="text-xs h-7"
                            value={editingBooking?.time}
                            onChange={(e) => setEditingBooking({ ...editingBooking!, time: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <select
                            className="w-full border border-zinc-200 rounded-lg px-2 h-7 text-xs"
                            value={editingBooking?.duration}
                            onChange={(e) => setEditingBooking({ ...editingBooking!, duration: e.target.value })}
                          >
                            <option value="30 min">30 min</option>
                            <option value="1 hour">1 hour</option>
                            <option value="1.5 hours">1.5 hours</option>
                            <option value="2 hours">2 hours</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <select
                            className="w-full border border-zinc-200 rounded-lg px-2 h-7 text-xs"
                            value={editingBooking?.status}
                            onChange={(e) => setEditingBooking({ ...editingBooking!, status: e.target.value as "Confirmed" | "Pending" })}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              onClick={() => handleSaveInlineBooking(editingBooking!)}
                              className="h-7 text-xs px-2"
                            >
                              Save
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={handleCancelEdit}
                              className="h-7 text-xs px-2"
                            >
                              Cancel
                            </Button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3">{booking.customer}</td>
                        <td className="px-4 py-3">{booking.service}</td>
                        <td className="px-4 py-3">{booking.date}</td>
                        <td className="px-4 py-3">{booking.time}</td>
                        <td className="px-4 py-3">{booking.duration}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleBookingStatusToggle(booking)}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => {
                              setEditingBooking(booking)
                              setEditingBookingId(booking.id)
                            }}
                            disabled={editingBookingId !== null || newInlineBooking}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  )
} 