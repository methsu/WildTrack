import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ExhibitCard from '../components/ExhibitCard'
import { FaPaw } from 'react-icons/fa'

const Exhibits = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const exhibits = [
    {
      id: 1,
      name: "African Savanna",
      image: "/images/exhibits/african-savanna.jpg",
      description: "Experience the majestic wildlife of Africa",
      category: "safari",
      animalCount: 15,
      openingHours: "9:00 AM - 5:00 PM",
      popularity: 95
    },
    // Add more exhibits...
  ]

  const categories = [
    { id: 'all', name: 'All Exhibits' },
    { id: 'safari', name: 'Safari' },
    { id: 'tropical', name: 'Tropical' },
    { id: 'arctic', name: 'Arctic' },
    { id: 'desert', name: 'Desert' }
  ]

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-center">Our Exhibits</h1>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-green-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Exhibits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exhibits
              .filter(exhibit => activeCategory === 'all' || exhibit.category === activeCategory)
              .map((exhibit, index) => (
                <motion.div
                  key={exhibit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ExhibitCard exhibit={exhibit} />
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Exhibits