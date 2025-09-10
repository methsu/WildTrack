import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaClock, FaPaw } from 'react-icons/fa'

const ExhibitCard = ({ exhibit }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={exhibit.image}
          alt={exhibit.name}
          className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-green-600 text-sm">{exhibit.popularity}% Popular</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{exhibit.name}</h3>
        <p className="text-gray-600 mb-4">{exhibit.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500">
            <FaClock className="mr-2" />
            {exhibit.openingHours}
          </div>
          <div className="flex items-center text-gray-500">
            <FaPaw className="mr-2" />
            {exhibit.animalCount} Animals
          </div>
        </div>

        <Link
          to={`/exhibits/${exhibit.id}`}
          className="block w-full text-center bg-green-50 text-green-600 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
        >
          Explore →
        </Link>
      </div>
    </motion.div>
  )
}

export default ExhibitCard