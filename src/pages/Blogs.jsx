import React, { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const Blogs = () => {
  const [blogs] = useState([
    {
      id: 1,
      title: 'Strategic Planning Frameworks for Business Success',
      category: 'Strategic Planning',
      author: 'Prime Consultancy Team',
      date: '2026-06-10',
      published: true,
      views: 1250
    },
    {
      id: 2,
      title: 'Business Transformation Guide for Ethiopian Companies',
      category: 'Business Growth',
      author: 'Dr. Abebe Desta',
      date: '2026-06-08',
      published: true,
      views: 980
    },
    {
      id: 3,
      title: 'Conducting Effective Feasibility Studies',
      category: 'Project Management',
      author: 'Tigist Mekonnen',
      date: '2026-06-05',
      published: false,
      views: 0
    },
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
          <p className="text-gray-600">Manage published content</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>New Post</span>
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Views</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="font-semibold text-gray-900">{blog.title}</td>
                  <td>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {blog.category}
                    </span>
                  </td>
                  <td className="text-gray-700">{blog.author}</td>
                  <td className="text-gray-600">{new Date(blog.date).toLocaleDateString()}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FaEye className="text-gray-400" />
                      <span>{blog.views}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <FaTrash />
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

export default Blogs
