import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPaw, FaCalendar, FaInfoCircle } from 'react-icons/fa'

const AnimalDetail = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('about')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with API call
  const animal = {
    id: 1,
    name: "Leo",
    species: "African Lion",
    images: [
      "/images/animals/lion/lion-1.jpg",
      "/images/animals/lion/lion-2.jpg",
      "/images/animals/lion/lion-3.jpg"
    ],
    age: 5,
    weight: "180 kg",
    diet: "Carnivore",
    habitat: "African Savanna",
    description: "Leo is our magnificent male lion and the leader of our pride...",
    schedule: [
      { time: "9:00 AM", activity: "Morning Feed" },
      { time: "2:00 PM", activity: "Educational Talk" },
      { time: "4:00 PM", activity: "Enrichment Activities" }
    ],
    conservation: {
      status: "Vulnerable",
      population: "Declining",
      threats: ["Habitat Loss", "Human Conflict", "Poaching"]
    }
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FaPaw className="text-6xl text-green-600" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative h-96">
            <img 
              src={animal.images[0]}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-8 left-8">
                <h1 className="text-4xl font-bold text-white mb-2">{animal.name}</h1>
                <p className="text-white/90 text-xl">{animal.species}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b">
            <nav className="flex">
              {['about', 'schedule', 'conservation', 'gallery'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="p-8">
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Age</h3>
                    <p>{animal.age} years</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Weight</h3>
                    <p>{animal.weight}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Diet</h3>
                    <p>{animal.diet}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">About {animal.name}</h2>
                  <p className="text-gray-600">{animal.description}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6">Daily Schedule</h2>
                <div className="space-y-4">
                  {animal.schedule.map((item, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaCalendar className="text-green-600 mr-4" />
                      <div className="flex-1">
                        <span className="font-medium">{item.time}</span>
                        <span className="mx-2">-</span>
                        <span>{item.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Add more tab content... */}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnimalDetail