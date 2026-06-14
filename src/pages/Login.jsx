import React, { useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Demo authentication
    if (email === 'admin@primeconsultancy.et' && password === 'admin123456') {
      localStorage.setItem('adminToken', 'demo-token-' + Date.now())
      localStorage.setItem('adminUser', JSON.stringify({
        name: 'Admin User',
        email: email,
        role: 'admin'
      }))
      onLogin()
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary-light flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">PC</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Prime Consultancy PLC</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-12"
                placeholder="admin@primeconsultancy.et"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-12"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-3 text-lg font-semibold">
            Sign In
          </button>
        </form>


      </div>
    </div>
  )
}

export default Login
