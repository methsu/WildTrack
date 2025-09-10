import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home'
import Animals from './pages/Animals'
import AnimalDetail from './pages/AnimalDetail'
import Exhibits from './pages/Exhibits'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UDashboard from './pages/UDashboard'
import ADashboard from './pages/ADashboard'  // Add this import
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/animals" element={<Animals />} />
              <Route path="/animals/:id" element={<AnimalDetail />} />
              <Route path="/exhibits" element={<Exhibits />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* User Dashboard Routes */}
              <Route path="/dashboard/*" element={
                <ProtectedRoute>
                  <Routes>
                    <Route index element={<UDashboard />} />
                    <Route path="favorites" element={<UDashboard section="favorites" />} />
                    <Route path="visits" element={<UDashboard section="visits" />} />
                    <Route path="profile" element={<UDashboard section="profile" />} />
                    <Route path="tickets" element={<UDashboard section="tickets" />} />
                  </Routes>
                </ProtectedRoute>
              } />

              {/* Admin Dashboard Routes */}
              <Route path="/admin/*" element={
                <ProtectedRoute adminOnly>
                  <Routes>
                    <Route path="dashboard" element={<ADashboard />} />
                    <Route path="users" element={<ADashboard section="users" />} />
                    <Route path="analytics" element={<ADashboard section="analytics" />} />
                    <Route path="settings" element={<ADashboard section="settings" />} />
                  </Routes>
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App