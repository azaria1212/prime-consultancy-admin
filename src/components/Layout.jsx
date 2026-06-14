import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { FaHome, FaCalendar, FaEnvelope, FaBlog, FaBriefcase, FaChartBar, FaStar, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'

const Layout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Dashboard' },
    { path: '/appointments', icon: FaCalendar, label: 'Appointments' },
    { path: '/contacts', icon: FaEnvelope, label: 'Messages' },
    { path: '/blogs', icon: FaBlog, label: 'Blogs' },
    { path: '/services', icon: FaBriefcase, label: 'Services' },
    { path: '/case-studies', icon: FaChartBar, label: 'Case Studies' },
    { path: '/testimonials', icon: FaStar, label: 'Testimonials' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-primary"
            >
              {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Prime Consultancy</h1>
                <p className="text-xs text-gray-600">Admin Dashboard</p>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="mt-4 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout
