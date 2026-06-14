import React, { useState } from 'react'
import { FaPlus, FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa'

const Services = () => {
  const [services] = useState([
    { id: 1, title: 'Corporate & Business Strategy', order: 1, active: true },
    { id: 2, title: 'Growth & Business Transformation', order: 2, active: true },
    { id: 3, title: 'Organizational Design & Development', order: 3, active: true },
    { id: 4, title: 'Project Feasibility Studies', order: 4, active: true },
    { id: 5, title: 'Business Plan Development', order: 5, active: true },
    { id: 6, title: 'Project Assessment & Evaluation', order: 6, active: true },
    { id: 7, title: 'Training & Capacity Building', order: 7, active: true },
    { id: 8, title: 'Research & Advisory Services', order: 8, active: true },
  ])

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

      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="card flex items-center justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                {service.order}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-600">Order: {service.order}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {service.active ? (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
