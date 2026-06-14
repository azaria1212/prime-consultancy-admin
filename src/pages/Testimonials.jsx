import React, { useState } from 'react'
import { FaStar, FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa'

const Testimonials = () => {
  const [testimonials] = useState([
    {
      id: 1,
      name: 'Alemitu Bekele',
      position: 'CEO',
      organization: 'Addis Manufacturing PLC',
      text: 'Prime Consultancy transformed our business strategy and helped us achieve 150% growth...',
      rating: 5,
      approved: true,
      date: '2026-06-10'
    },
    {
      id: 2,
      name: 'Dawit Tesfaye',
      position: 'Program Director',
      organization: 'Ethiopia Development Initiative',
      text: 'Working with Prime Consultancy on our project evaluation was a game-changer...',
      rating: 5,
      approved: true,
      date: '2026-06-08'
    },
    {
      id: 3,
      name: 'Helen Amare',
      position: 'Founder',
      organization: 'Bloom Coffee Exporters',
      text: 'The feasibility study prepared by Prime Consultancy helped us secure funding...',
      rating: 5,
      approved: false,
      date: '2026-06-12'
    },
  ])

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar key={index} className={index < rating ? 'text-gold' : 'text-gray-300'} />
    ))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Testimonials</h1>
        <p className="text-gray-600">Manage client reviews and feedback</p>
      </div>

      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="card hover:shadow-xl transition-shadow">
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
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <FaCheckCircle size={20} />
                  </button>
                )}
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  {testimonial.approved ? <FaTrash size={18} /> : <FaTimesCircle size={20} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
