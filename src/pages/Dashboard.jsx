import { useState, useEffect } from 'react'
import { FaCalendar, FaEnvelope, FaBlog, FaChartBar, FaStar, FaBriefcase } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const Dashboard = () => {
  const [stats, setStats] = useState([
    { icon: FaCalendar, label: 'Appointments', value: 0, color: 'bg-blue-500' },
    { icon: FaEnvelope, label: 'Messages', value: 0, color: 'bg-green-500' },
    { icon: FaBlog, label: 'Blog Posts', value: 0, color: 'bg-purple-500' },
    { icon: FaChartBar, label: 'Case Studies', value: 0, color: 'bg-orange-500' },
    { icon: FaStar, label: 'Testimonials', value: 0, color: 'bg-yellow-500' },
    { icon: FaBriefcase, label: 'Services', value: 0, color: 'bg-indigo-500' },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_URL}/admin/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        console.warn('Stats API failed, using defaults')
        setLoading(false)
        return
      }
      
      const data = await response.json()
      console.log('Stats data:', data)
      
      // Safely extract values from nested structure
      const appointmentsCount = (data.appointments && typeof data.appointments.total === 'number') ? data.appointments.total : 0
      const contactsCount = (data.contacts && typeof data.contacts.total === 'number') ? data.contacts.total : 0
      const blogsCount = (data.content && typeof data.content.blogs === 'number') ? data.content.blogs : 0
      const caseStudiesCount = (data.content && typeof data.content.caseStudies === 'number') ? data.content.caseStudies : 0
      const testimonialsCount = (data.content && typeof data.content.testimonials === 'number') ? data.content.testimonials : 0
      const servicesCount = (data.content && typeof data.content.services === 'number') ? data.content.services : 0
      
      setStats([
        { icon: FaCalendar, label: 'Appointments', value: appointmentsCount, color: 'bg-blue-500' },
        { icon: FaEnvelope, label: 'Messages', value: contactsCount, color: 'bg-green-500' },
        { icon: FaBlog, label: 'Blog Posts', value: blogsCount, color: 'bg-purple-500' },
        { icon: FaChartBar, label: 'Case Studies', value: caseStudiesCount, color: 'bg-orange-500' },
        { icon: FaStar, label: 'Testimonials', value: testimonialsCount, color: 'bg-yellow-500' },
        { icon: FaBriefcase, label: 'Services', value: servicesCount, color: 'bg-indigo-500' },
      ])
      
    } catch (error) {
      console.error('Error fetching stats:', error)
      setError('Could not load statistics')
    } finally {
      setLoading(false)
    }
  }

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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      {loading ? (
        <div className="text-center text-gray-600 py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats && stats.length > 0 && stats.map((stat, index) => {
            if (!stat || !stat.icon) return null
            const Icon = stat.icon
            return (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label || 'N/A'}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value || 0}</p>
                  </div>
                  <div className={`${stat.color || 'bg-gray-500'} w-16 h-16 rounded-xl flex items-center justify-center`}>
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Recent Activities */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities && recentActivities.map((activity, index) => (
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
