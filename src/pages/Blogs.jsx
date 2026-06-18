import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa'

const API_URL = 'https://prime-consultancy-backend.onrender.com/api';

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    author: '',
    image: '',
    readTime: '',
    published: false
  })

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog)
      setFormData({
        title: blog.title || '',
        summary: blog.summary || '',
        content: blog.content || '',
        category: blog.category || '',
        author: blog.author || '',
        image: blog.image || '',
        readTime: blog.readTime || '',
        published: blog.published || false
      })
    } else {
      setEditingBlog(null)
      setFormData({
        title: '',
        summary: '',
        content: '',
        category: '',
        author: '',
        image: '',
        readTime: '',
        published: false
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingBlog(null)
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: '',
      author: '',
      image: '',
      readTime: '',
      published: false
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingBlog 
        ? `${API_URL}/blogs/${editingBlog._id}`
        : `${API_URL}/blogs`
      
      const method = editingBlog ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert(editingBlog ? 'Blog updated successfully' : 'Blog created successfully')
        handleCloseModal()
        fetchBlogs()
      } else {
        alert('Error saving blog')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving blog')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
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
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center space-x-2">
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
                      <button 
                        onClick={() => handleOpenModal(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
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

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
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
                    placeholder="10 Strategies for Business Growth in Ethiopia"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Summary *</label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    required
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief summary of the blog post..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Content *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Full blog post content..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Business Strategy"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Admin"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Read Time</label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="5 min read"
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
                  {editingBlog ? 'Update Blog Post' : 'Create Blog Post'}
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

export default Blogs
