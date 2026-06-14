import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaBuilding, FaCheckCircle } from 'react-icons/fa'

const Contacts = () => {
  const [contacts] = useState([
    {
      id: 1,
      name: 'Sarah Williams',
      email: 'sarah@company.com',
      phone: '+251 911 567 890',
      company: 'Tech Innovations Ltd',
      service: 'Business Strategy',
      message: 'Interested in strategic planning services for our startup...',
      status: 'new',
      date: '2026-06-15'
    },
    {
      id: 2,
      name: 'David Brown',
      email: 'david@enterprise.com',
      phone: '+251 911 678 901',
      company: 'Enterprise Solutions',
      service: 'Feasibility Study',
      message: 'Need feasibility study for new project expansion...',
      status: 'contacted',
      date: '2026-06-14'
    },
  ])

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
        {contacts.map((contact) => (
          <div key={contact.id} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
                <p className="text-gray-600">{contact.company}</p>
              </div>
              {getStatusBadge(contact.status)}
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
                <span className="text-sm">{contact.service}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700">{contact.message}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{new Date(contact.date).toLocaleDateString()}</span>
              <button className="btn-primary flex items-center space-x-2">
                <FaCheckCircle />
                <span>Mark as Contacted</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contacts
