import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Contacts from './pages/Contacts'
import Blogs from './pages/Blogs'
import Services from './pages/Services'
import CaseStudies from './pages/CaseStudies'
import Testimonials from './pages/Testimonials'
import Layout from './components/Layout'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    setIsAuthenticated(!!token)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout onLogout={handleLogout} />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="services" element={<Services />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="testimonials" element={<Testimonials />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
