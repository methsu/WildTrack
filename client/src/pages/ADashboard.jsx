import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/axiosConfig'
import AnimalForm from '../components/animalform'

const ADashboard = ({ section = 'users' }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState(section)
  
  // User state
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  })

  // Animal state
  const [animals, setAnimals] = useState([])
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [animalForm, setAnimalForm] = useState({
    name: '',
    species: '',
    age: '',
    category: 'big-cats', // Set default category
    habitat: '',
    diet: '',
    description: '',
    images: ['placeholder.jpg'], // Default image
    conservation: {
      status: 'Least Concern',
      population: 'Unknown',
      threats: []
    },
    exhibit: '65215f3d1b7c592cd4908012', // Replace with actual exhibit ID
    schedule: []
  })

  // Shared state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/dashboard')
      return
    }
    fetchUsers()
    if (activeSection === 'animals') {
      fetchAnimals()
    }
  }, [user, navigate, activeSection])

  // User management functions
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get('/users')
      setUsers(response.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${userId}`)
        setUsers(users.filter(user => user._id !== userId))
        setError('')
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete user')
      }
    }
  }

  const handleSelectUser = (user) => {
    setSelectedUser(user)
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    })
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    try {
      const response = await api.put(`/users/${selectedUser._id}`, editForm)
      setUsers(users.map(user => 
        user._id === selectedUser._id ? response.data : user
      ))
      setSelectedUser(null)
      setEditForm({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
      })
      setError('')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update user')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Handle user form changes
    if (selectedUser) {
      setEditForm(prev => ({
        ...prev,
        [name]: value
      }))
      return
    }

    // Handle animal form changes with nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setAnimalForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setAnimalForm(prev => ({
        ...prev,
        [name]: name === 'age' ? Number(value) : value
      }))
    }
  }

  // Animal management functions
  const fetchAnimals = async () => {
    try {
      setLoading(true)
      const response = await api.get('/animals')
      setAnimals(response.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch animals')
    } finally {
      setLoading(false)
    }
  }

  const handleAddAnimal = async (e) => {
    e.preventDefault()
    try {
      // Validate required fields
      const requiredFields = ['name', 'species', 'age', 'category', 'habitat', 'diet', 'description', 'exhibit']
      const missingFields = requiredFields.filter(field => !animalForm[field])
      
      if (missingFields.length > 0) {
        setError(`Missing required fields: ${missingFields.join(', ')}`)
        return
      }

      const response = await api.post('/animals', animalForm)
      setAnimals([...animals, response.data])
      setSelectedAnimal(null)
      setAnimalForm({
        name: '',
        species: '',
        age: '',
        category: 'big-cats',
        habitat: '',
        diet: '',
        description: '',
        images: ['placeholder.jpg'],
        conservation: {
          status: 'Least Concern',
          population: 'Unknown',
          threats: []
        },
        exhibit: '65215f3d1b7c592cd4908012',
        schedule: []
      })
      setError('')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add animal')
    }
  }

  const handleUpdateAnimal = async (e) => {
    e.preventDefault()
    try {
      // Validate required fields
      const requiredFields = ['name', 'species', 'age', 'category', 'habitat', 'diet', 'description', 'exhibit']
      const missingFields = requiredFields.filter(field => !animalForm[field])
      
      if (missingFields.length > 0) {
        setError(`Missing required fields: ${missingFields.join(', ')}`)
        return
      }

      const response = await api.put(`/animals/${selectedAnimal._id}`, animalForm)
      setAnimals(animals.map(animal => 
        animal._id === selectedAnimal._id ? response.data : animal
      ))
      setSelectedAnimal(null)
      setAnimalForm({
        name: '',
        species: '',
        age: '',
        category: 'big-cats',
        habitat: '',
        diet: '',
        description: '',
        images: ['placeholder.jpg'],
        conservation: {
          status: 'Least Concern',
          population: 'Unknown',
          threats: []
        },
        exhibit: '65215f3d1b7c592cd4908012',
        schedule: []
      })
      setError('')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update animal')
    }
  }

  const handleDeleteAnimal = async (animalId) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      try {
        await api.delete(`/animals/${animalId}`)
        setAnimals(animals.filter(animal => animal._id !== animalId))
        setError('')
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete animal')
      }
    }
  }

  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal)
    setAnimalForm({
      name: animal.name || '',
      species: animal.species || '',
      age: animal.age || '',
      category: animal.category || 'big-cats',
      habitat: animal.habitat || '',
      diet: animal.diet || '',
      description: animal.description || '',
      images: animal.images || ['placeholder.jpg'],
      conservation: animal.conservation || {
        status: 'Least Concern',
        population: 'Unknown',
        threats: []
      },
      exhibit: animal.exhibit?._id || '65215f3d1b7c592cd4908012',
      schedule: animal.schedule || []
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage users and animals
            </p>
          </div>
          <div className="mt-4 sm:mt-0 space-x-3">
            <button
              onClick={() => {
                setActiveSection('users')
                fetchUsers()
              }}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                activeSection === 'users'
                  ? 'bg-indigo-600 text-white border-transparent'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => {
                setActiveSection('animals')
                fetchAnimals()
              }}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                activeSection === 'animals'
                  ? 'bg-indigo-600 text-white border-transparent'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              Animals
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => setError('')}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="sr-only">Close</span>
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        {activeSection === 'users' ? (
          <>
            {selectedUser && (
              <div className="mb-8 bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Edit User
                  </h3>
                  <form onSubmit={handleUpdateUser} className="mt-5 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={editForm.firstName}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={editForm.lastName}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={editForm.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={editForm.role}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(null)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                    {user.firstName[0]}{user.lastName[0]}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.firstName} {user.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 'admin' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleSelectUser(user)}
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="text-red-600 hover:text-red-900"
                                disabled={user.role === 'admin'}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedAnimal({})}
              className="mb-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New Animal
            </button>

            {selectedAnimal && (
              <AnimalForm
                animal={selectedAnimal}
                onChange={handleChange}
                onSubmit={selectedAnimal._id ? handleUpdateAnimal : handleAddAnimal}
                onCancel={() => setSelectedAnimal(null)}
              />
            )}

            <div className="flex flex-col mt-8">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Animal
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Species
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Conservation
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {animals.map((animal) => (
                          <tr key={animal._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{animal.name}</div>
                              <div className="text-sm text-gray-500">Age: {animal.age}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{animal.species}</div>
                              <div className="text-sm text-gray-500">{animal.habitat}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {animal.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                animal.conservation?.status === 'Extinct' 
                                  ? 'bg-red-100 text-red-800'
                                  : animal.conservation?.status === 'Endangered'
                                  ? 'bg-orange-100 text-orange-800'
                                  : animal.conservation?.status === 'Vulnerable'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {animal.conservation?.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleSelectAnimal(animal)}
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAnimal(animal._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ADashboard