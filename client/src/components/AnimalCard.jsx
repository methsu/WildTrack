import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaPaw } from 'react-icons/fa'

const AnimalCard = ({ animal }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative">
        <img 
          src={animal.image} 
          alt={animal.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-green-600 text-sm">{animal.conservation}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{animal.name}</h2>
        <p className="text-gray-600 mb-4">{animal.species}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-500">
            <FaPaw className="mr-2" />
            {animal.age} years old
          </div>
          <div className="flex items-center text-gray-500">
            <span className="mr-2">🌍</span>
            {animal.habitat}
          </div>
        </div>

        <Link
          to={`/animals/${animal.id}`}
          className="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  )
}

export default AnimalCard