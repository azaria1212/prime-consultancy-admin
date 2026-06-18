import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle, FaTimesCircle, FaTrash, FaPlus, FaEdit, FaTimes } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    organization: '',
    text: '',
    rating: 5,
    image: '',
    approved: false
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${API_URL}/testimonials`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setTestimonials(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials([])
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'rating' ? parseInt(value) : value)
    }))
  }

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial)
      setFormData({
        name: testimonial.name || '',
        position: testimonial.position || '',
        organization: testimonial.organization || '',
        text: testimonial.text || '',
        rating: testimonial.rating || 5,
        image: testimonial.image || '',
        approved: testimonial.approved || false
      })
    } else {
      setEditingTestimonial(null)
      setFormData({
        name: '',
        position: '',
        organization: '',
        text: '',
        rating: 5,
        image: '',
        approved: false
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTestimonial(null)
    setFormData({
      name: '',
      position: '',
      organization: '',
      text: '',
      rating: 5,
      image: '',
      approved: false
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingTestimonial 
        ? `${API_URL}/testimonials/${editingTestimonial._id}`
        : `${API_URL}/testimonials`
      
      const method = editingTestimonial ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert(editingTestimonial ? 'Testimonial updated successfully' : 'Testimonial created successfully')
        handleCloseModal()
        fetchTestimonials()
      } else {
        alert('Error saving testimonial')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving testimonial')
    }
  }

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${API_URL}/testimonials/${id}/approve`, {
        method: 'PATCH',
      })
      
      if (response.ok) {
        alert('Testimonial approved successfully')
        fetchTestimonials()
      } else {
        alert('Error approving testimonial')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error approving testimonial')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    
    try {
      const response = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        alert('Testimonial deleted successfully')
        fetchTestimonials()
      } else {
        alert('Error deleting testimonial')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting testimonial')
    }
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar key={index} className={index < rating ? 'text-gold' : 'text-gray-300'} />
    ))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Testimonials</h1>
          <p className="text-gray-600">Manage client reviews and feedback</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>New Testimonial</span>
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 py-8">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No testimonials yet</p>
      ) : (
      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex space-x-1">
                {renderStars(testimonial.rating)}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                testimonial.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {testimonial.approved ? 'Approved' : 'Pending'}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
                <p className="text-sm text-gold">{testimonial.organization}</p>
              </div>
              
              <div className="flex space-x-2">
                {!testimonial.approved && (
                  <button 
                    onClick={() => handleApprove(testimonial._id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    title="Approve"
                  >
                    <FaCheckCircle size={20} />
                  </button>
                )}
                <button 
                  onClick={() => handleOpenModal(testimonial)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(testimonial._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete"
                >
                  <FaTrash size={18} />
                </button>
              </div>
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
                {editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Alemitu Bekele"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="CEO"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Addis Manufacturing PLC"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Testimonial Text *</label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Write the testimonial text here..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Rating (1-5)</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="approved"
                    checked={formData.approved}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700 font-semibold">Approve immediately</label>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button type="submit" className="btn-primary flex-1">
                  {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
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

export default Testimonials
