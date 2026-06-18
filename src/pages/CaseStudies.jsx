import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingStudy, setEditingStudy] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    industry: '',
    client: '',
    challenge: '',
    solution: '',
    results: '',
    duration: '',
    image: '',
    published: false
  })

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch(`${API_URL}/case-studies`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setCaseStudies(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching case studies:', error)
      setCaseStudies([])
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleOpenModal = (study = null) => {
    if (study) {
      setEditingStudy(study)
      setFormData({
        title: study.title || '',
        industry: study.industry || '',
        client: study.client || '',
        challenge: study.challenge || '',
        solution: study.solution || '',
        results: Array.isArray(study.results) ? study.results.join('\n') : '',
        duration: study.duration || '',
        image: study.image || '',
        published: study.published || false
      })
    } else {
      setEditingStudy(null)
      setFormData({
        title: '',
        industry: '',
        client: '',
        challenge: '',
        solution: '',
        results: '',
        duration: '',
        image: '',
        published: false
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingStudy(null)
    setFormData({
      title: '',
      industry: '',
      client: '',
      challenge: '',
      solution: '',
      results: '',
      duration: '',
      image: '',
      published: false
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const resultsArray = formData.results.split('\n').filter(r => r.trim())
    const payload = {
      ...formData,
      results: resultsArray
    }

    try {
      const url = editingStudy 
        ? `${API_URL}/case-studies/${editingStudy._id}`
        : `${API_URL}/case-studies`
      
      const method = editingStudy ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        alert(editingStudy ? 'Case study updated successfully' : 'Case study created successfully')
        handleCloseModal()
        fetchCaseStudies()
      } else {
        alert('Error saving case study')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving case study')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this case study?')) return
    
    try {
      const response = await fetch(`${API_URL}/case-studies/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        alert('Case study deleted successfully')
        fetchCaseStudies()
      } else {
        alert('Error deleting case study')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting case study')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Studies</h1>
          <p className="text-gray-600">Showcase success stories</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>New Case Study</span>
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 py-8">Loading case studies...</p>
      ) : caseStudies.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No case studies yet</p>
      ) : (
      <div className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <div key={study._id} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                {study.industry}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                study.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {study.published ? 'Published' : 'Draft'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
            <p className="text-gray-600 mb-4">{study.client}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Duration: {study.duration}</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleOpenModal(study)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(study._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FaTrash />
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
                {editingStudy ? 'Edit Case Study' : 'New Case Study'}
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
                    placeholder="Banking Sector Digital Transformation"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Financial Services"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Client</label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Leading Ethiopian Bank"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="12 months"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Challenge</label>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the client's challenge..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Solution</label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the solution provided..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Results (one per line)</label>
                  <textarea
                    name="results"
                    value={formData.results}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="150% increase in efficiency&#10;Reduced costs by 30%&#10;Improved customer satisfaction"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700 font-semibold">Publish immediately</label>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button type="submit" className="btn-primary flex-1">
                  {editingStudy ? 'Update Case Study' : 'Create Case Study'}
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

export default CaseStudies
