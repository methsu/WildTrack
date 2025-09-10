import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const currentPath = location.pathname.split('/')[2] || 'overview'

  const menuItems = [
    { section: 'overview', path: '/dashboard', name: 'Overview', icon: '📊' },
    { section: 'favorites', path: '/dashboard/favorites', name: 'My Animals', icon: '⭐' },
    { section: 'visits', path: '/dashboard/visits', name: 'Visit History', icon: '🗓' },
    { section: 'profile', path: '/dashboard/profile', name: 'Profile Settings', icon: '👤' },
    { section: 'tickets', path: '/dashboard/tickets', name: 'My Tickets', icon: '🎟' }
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div 
      className={`bg-white h-screen shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } sticky top-0`}
    >
      <div className="flex flex-col h-full">
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    currentPath === item.section
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            {isCollapsed ? '→' : '←'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full mt-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <span className="text-xl">🚪</span>
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar