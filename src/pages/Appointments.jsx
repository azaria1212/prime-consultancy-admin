import React, { useState } from 'react'
import { FaClock, FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const Appointments = () => {
  const [appointments] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+251 911 234 567',
      service: 'Business Strategy',
      date: '2026-06-20',
      status: 'pending',
      company: 'ABC Corp'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+251 911 345 678',
      service: 'Feasibility Study',
      date: '2026-06-22',
      status: 'confirmed',
      company: 'XYZ Industries'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael@example.com',
      phone: '+251 911 456 789',
      service: 'Project Evaluation',
      date: '2026-06-25',
      status: 'pending',
      company: 'Tech Solutions Ltd'
    },
  ])

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
        <p className="text-gray-600">Manage consultation bookings</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td>
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.name}</p>
                      <p className="text-sm text-gray-600">{appointment.company}</p>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <div className="flex items-center space-x-2 mb-1">
                        <FaEnvelope className="text-gray-400" size={12} />
                        <span>{appointment.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaPhone className="text-gray-400" size={12} />
                        <span>{appointment.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-700">{appointment.service}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-gray-400" size={14} />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>{getStatusBadge(appointment.status)}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <FaCheckCircle />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <FaTimesCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Appointments
