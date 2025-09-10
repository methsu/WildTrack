// filepath: c:\Users\Asu\Documents\GitHub\WildTrack\client\src\components\Header.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-green-800 text-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img src="/logo.png" alt="WildTrack" className="h-10 w-10 mr-2" />
            WildTrack
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/exhibits" className="hover:text-green-300 transition-colors">Exhibits</Link>
            <Link to="/animals" className="hover:text-green-300 transition-colors">Animals</Link>
            <Link to="/events" className="hover:text-green-300 transition-colors">Events</Link>
            <Link to="/tickets" className="hover:text-green-300 transition-colors">Tickets</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="hover:text-green-300 transition-colors">Dashboard</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-green-300 transition-colors">Login</Link>
                <Link 
                  to="/signup"
                  className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pt-4`}>
          <div className="flex flex-col space-y-4">
            <Link to="/exhibits" className="hover:text-green-300">Exhibits</Link>
            <Link to="/animals" className="hover:text-green-300">Animals</Link>
            <Link to="/events" className="hover:text-green-300">Events</Link>
            <Link to="/tickets" className="hover:text-green-300">Tickets</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-green-300">Dashboard</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-300">Login</Link>
                <Link 
                  to="/signup"
                  className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header