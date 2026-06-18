import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setBlogs(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setBlogs([])
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        alert('Blog deleted successfully')
        fetchBlogs()
      } else {
        alert('Error deleting blog')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting blog')
    }
  }

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
        {loading ? (
          <p className="text-center text-gray-600 py-8">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600 py-8">No blogs yet</p>
        ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="font-semibold text-gray-900">{blog.title}</td>
                  <td>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {blog.category || 'General'}
                    </span>
                  </td>
                  <td className="text-gray-700">{blog.author || 'Admin'}</td>
                  <td className="text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</td>
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
                      <button 
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  )
}

export default Blogs
