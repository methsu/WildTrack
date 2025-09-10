import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/axiosConfig'
import Sidebar from '../components/sidebar'
import Profile from '../components/profile'

const DashboardSection = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
)

const UDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [visitHistory, setVisitHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentSection = location.pathname.split('/')[2] || 'overview'

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token || !user) {
      navigate('/login')
      return
    }
    fetchUserData()
  }, [user, navigate])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError('')
      const [favoritesRes, historyRes] = await Promise.all([
        api.get('/users/favorites'),
        api.get('/users/visit-history')
      ])
      setFavorites(favoritesRes.data)
      setVisitHistory(historyRes.data)
    } catch (error) {
      if (error.response?.status === 401) {
        logout()
        navigate('/login')
      } else {
        setError(error.response?.data?.message || 'Error loading dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (animalId) => {
    try {
      await api.delete(`/users/favorites/${animalId}`)
      setFavorites(favorites.filter(fav => fav._id !== animalId))
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to remove favorite')
    }
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return renderOverview()
      case 'profile':
        return <Profile />
      case 'favorites':
        return renderFavorites()
      case 'visits':
        return renderVisits()
      case 'tickets':
        return renderTickets()
      default:
        return renderOverview()
    }
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ... existing overview content ... */}
    </div>
  )

  const renderFavorites = () => (
    <DashboardSection title="All Favorite Animals">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite) => (
          <div key={favorite._id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {favorite.image && (
                <img src={favorite.image} alt={favorite.name} className="w-12 h-12 rounded-full object-cover" />
              )}
              <div>
                <p className="font-medium">{favorite.name}</p>
                <p className="text-sm text-gray-500">{favorite.species}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveFavorite(favorite._id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </DashboardSection>
  )

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={() => setError('')}
                className="text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          )}

          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {currentSection === 'overview' && `Welcome back, ${user?.firstName}!`}
              {currentSection === 'favorites' && 'My Favorite Animals'}
              {currentSection === 'visits' && 'Visit History'}
              {currentSection === 'profile' && 'Profile Settings'}
              {currentSection === 'tickets' && 'My Tickets'}
            </h1>
            <button
              onClick={fetchUserData}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh Data
            </button>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default UDashboard