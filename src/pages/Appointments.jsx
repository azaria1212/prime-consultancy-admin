import { useState, useEffect } from 'react'
import { FaClock, FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${API_URL}/appointments`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setAppointments(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setAppointments([])
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        alert('Status updated successfully')
        fetchAppointments()
      } else {
        alert('Error updating status')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error updating status')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return
    
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        alert('Appointment deleted successfully')
        fetchAppointments()
      } else {
        alert('Error deleting appointment')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting appointment')
    }
  }

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
                <tr key={appointment._id || appointment.id} className="hover:bg-gray-50">
                  <td>
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.fullName || appointment.name}</p>
                      <p className="text-sm text-gray-600">{appointment.companyName || appointment.company || 'No company'}</p>
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
                  <td className="text-gray-700">{appointment.serviceNeeded || appointment.service}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-gray-400" size={14} />
                      <span>{new Date(appointment.preferredDate || appointment.date).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>{getStatusBadge(appointment.status || 'pending')}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleStatusChange(appointment._id || appointment.id, 'confirmed')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Confirm"
                      >
                        <FaCheckCircle />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(appointment._id || appointment.id, 'cancelled')}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                        title="Cancel"
                      >
                        <FaTimesCircle />
                      </button>
                      <button 
                        onClick={() => handleDelete(appointment._id || appointment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        Delete
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
