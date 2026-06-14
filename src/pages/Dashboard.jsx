import React from 'react'
import { FaCalendar, FaEnvelope, FaBlog, FaChartBar, FaStar, FaBriefcase } from 'react-icons/fa'

const Dashboard = () => {
  const stats = [
    { icon: FaCalendar, label: 'Appointments', value: '24', color: 'bg-blue-500', pending: 8 },
    { icon: FaEnvelope, label: 'Messages', value: '15', color: 'bg-green-500', pending: 5 },
    { icon: FaBlog, label: 'Blog Posts', value: '32', color: 'bg-purple-500', pending: 3 },
    { icon: FaChartBar, label: 'Case Studies', value: '12', color: 'bg-orange-500', pending: 0 },
    { icon: FaStar, label: 'Testimonials', value: '45', color: 'bg-yellow-500', pending: 2 },
    { icon: FaBriefcase, label: 'Services', value: '8', color: 'bg-indigo-500', pending: 0 },
  ]

  const recentActivities = [
    { type: 'appointment', message: 'New appointment from John Doe', time: '2 hours ago' },
    { type: 'contact', message: 'Contact form submission from ABC Corp', time: '4 hours ago' },
    { type: 'appointment', message: 'Appointment confirmed with Jane Smith', time: '5 hours ago' },
    { type: 'testimonial', message: 'New testimonial pending approval', time: '1 day ago' },
    { type: 'blog', message: 'Blog post published: Business Strategy Tips', time: '2 days ago' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  {stat.pending > 0 && (
                    <p className="text-sm text-orange-600 mt-1">
                      {stat.pending} pending
                    </p>
                  )}
                </div>
                <div className={`${stat.color} w-16 h-16 rounded-xl flex items-center justify-center`}>
                  <Icon className="text-white" size={28} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-200 last:border-0">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
