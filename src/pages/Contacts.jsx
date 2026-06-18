import { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaBuilding, FaCheckCircle } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contact`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setContacts(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setContacts([])
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return
    
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        alert('Contact deleted successfully')
        fetchContacts()
      } else {
        alert('Error deleting contact')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting contact')
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        alert('Status updated successfully')
        fetchContacts()
      } else {
        alert('Error updating status')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error updating status')
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
        <p className="text-gray-600">Manage inquiries from potential clients</p>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <p className="text-center text-gray-600 py-8">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-600 py-8">No contacts yet</p>
        ) : (
          contacts.map((contact) => (
          <div key={contact._id || contact.id} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{contact.fullName || contact.name}</h3>
                <p className="text-gray-600">{contact.companyName || contact.company || 'No company'}</p>
              </div>
              {getStatusBadge(contact.status || 'new')}
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaEnvelope className="text-gray-400" />
                <span className="text-sm">{contact.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaPhone className="text-gray-400" />
                <span className="text-sm">{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaBuilding className="text-gray-400" />
                <span className="text-sm">{contact.serviceNeeded || contact.service}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700">{contact.message}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{new Date(contact.createdAt || contact.date).toLocaleDateString()}</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleStatusChange(contact._id || contact.id, 'contacted')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <FaCheckCircle />
                  <span>Mark as Contacted</span>
                </button>
                <button 
                  onClick={() => handleDelete(contact._id || contact.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Contacts
