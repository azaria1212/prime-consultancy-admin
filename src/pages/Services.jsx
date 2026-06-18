import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/services`)
      const data = await response.json()
      setServices(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        alert('Service deleted successfully')
        fetchServices()
      } else {
        alert('Error deleting service')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting service')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Services</h1>
          <p className="text-gray-600">Manage consulting services offered</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>New Service</span>
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 py-8">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No services yet</p>
      ) : (
      <div className="grid gap-4">
        {services.map((service, index) => (
          <div key={service._id} className="card flex items-center justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description?.substring(0, 60)}...</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {service.active !== false ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <FaEye size={12} />
                  <span>Active</span>
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <FaEyeSlash size={12} />
                  <span>Hidden</span>
                </span>
              )}
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <FaEdit />
              </button>
              <button 
                onClick={() => handleDelete(service._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default Services
