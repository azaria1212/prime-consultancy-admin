import React, { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const CaseStudies = () => {
  const [caseStudies] = useState([
    {
      id: 1,
      title: 'Banking Sector Digital Transformation',
      industry: 'Financial Services',
      client: 'Leading Ethiopian Bank',
      duration: '12 months',
      published: true
    },
    {
      id: 2,
      title: 'Manufacturing Excellence Program',
      industry: 'Manufacturing',
      client: 'Industrial Manufacturing Company',
      duration: '10 months',
      published: true
    },
    {
      id: 3,
      title: 'NGO Impact Assessment Framework',
      industry: 'Development Sector',
      client: 'International Development Organization',
      duration: '8 months',
      published: false
    },
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Studies</h1>
          <p className="text-gray-600">Showcase success stories</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>New Case Study</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <div key={study.id} className="card hover:shadow-xl transition-shadow">
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
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <FaEye />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <FaEdit />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaseStudies
