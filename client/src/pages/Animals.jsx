import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimalCard from '../components/AnimalCard'
import { FaSearch, FaPaw } from 'react-icons/fa'

const Animals = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const animals = [
    {
      id: 1,
      name: "Leo",
      species: "African Lion",
      image: "/images/animals/lion/lion-1.jpg",
      category: "big-cats",
      age: 5,
      habitat: "African Savanna",
      conservation: "Vulnerable"
    },
    // Add more animals...
  ]

  const categories = [
    { id: 'all', name: 'All Animals' },
    { id: 'big-cats', name: 'Big Cats' },
    { id: 'primates', name: 'Primates' },
    { id: 'birds', name: 'Birds' },
    { id: 'reptiles', name: 'Reptiles' }
  ]

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || animal.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
          <h1 className="text-4xl font-bold text-center">Our Animals</h1>
          
          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search animals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <FaSearch className="absolute left-4 top-4 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-green-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Animals Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnimals.map((animal, index) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimalCard animal={animal} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Animals