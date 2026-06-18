import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaEye, FaEyeSlash, FaTrash, FaTimes } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    details: '',
    order: 0,
    isActive: true
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/services`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setServices(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      setServices([])
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'order' ? parseInt(value) || 0 : value)
    }))
  }

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service)
      setFormData({
        title: service.title || '',
        description: service.description || '',
        icon: service.icon || '',
        details: service.details || '',
        order: service.order || 0,
        isActive: service.isActive !== false
      })
    } else {
      setEditingService(null)
      setFormData({
        title: '',
        description: '',
        icon: '',
        details: '',
        order: 0,
        isActive: true
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingService(null)
    setFormData({
      title: '',
      description: '',
      icon: '',
      details: '',
      order: 0,
      isActive: true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingService 
        ? `${API_URL}/services/${editingService._id}`
        : `${API_URL}/services`
      
      const method = editingService ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert(editingService ? 'Service updated successfully' : 'Service created successfully')
        handleCloseModal()
        fetchServices()
      } else {
        alert('Error saving service')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving service')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    
    try {
      const response = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
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
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center space-x-2">
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
                {service.order || index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description?.substring(0, 60)}...</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {service.isActive !== false ? (
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
              <button 
                onClick={() => handleOpenModal(service)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
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

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingService ? 'Edit Service' : 'New Service'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Corporate & Business Strategy"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the service..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Details</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed information about the service..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Icon (React Icon name)</label>
                    <input
                      type="text"
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="FaBriefcase"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Display Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700 font-semibold">Active (show on website)</label>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button type="submit" className="btn-primary flex-1">
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services
