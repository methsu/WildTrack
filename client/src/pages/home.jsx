import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaCalendar, FaClock, FaPaw } from 'react-icons/fa'

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const highlights = [
    {
      title: "Giant Pandas",
      image: "/images/panda.jpg",
      description: "Meet our gentle giant pandas in their natural bamboo habitat!",
      color: "from-green-500"
    },
    {
      title: "Elephant Safari",
      image: "/images/elephant.jpg",
      description: "Experience our majestic elephants roaming in their spacious sanctuary",
      color: "from-yellow-500"
    },
    {
      title: "Penguin Colony",
      image: "/images/penguine.jpg",
      description: "Watch our playful penguins swim and waddle in their Antarctic environment",
      color: "from-blue-500"
    }
  ]

  const exhibits = [
    {
      id: 1,
      name: "Lion's Den",
      image: "/images/lion.jpg",
      description: "Home to our magnificent lion pride",
      animalCount: 6,
      openingHours: "9:00 AM - 5:00 PM",
      popularity: 98
    },
    // ...existing exhibits with added properties...
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % highlights.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [highlights.length])

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Hero Section with Enhanced Carousel */}
      <section className="relative h-[90vh] bg-cover bg-center transition-all duration-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${highlights[activeSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${highlights[activeSlide].color} to-transparent opacity-60`} />
          </motion.div>
        </AnimatePresence>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-6xl font-bold mb-6">
              {highlights[activeSlide].title}
            </h1>
            <p className="text-2xl mb-8">
              {highlights[activeSlide].description}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/tickets" 
                    className="group inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
                Plan Your Visit
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {highlights.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-12 h-2 rounded-full transition-all duration-300 ${
                index === activeSlide ? 'bg-white w-20' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Exhibits with Hover Effects */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Featured Exhibits
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {exhibits.map((exhibit, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              key={exhibit.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={exhibit.image}
                  alt={exhibit.name}
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                  <span className="text-green-600">{exhibit.popularity}% Popular</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{exhibit.name}</h3>
                <p className="text-gray-600 mb-4">{exhibit.description}</p>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-2" />
                    {exhibit.openingHours}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaPaw className="mr-2" />
                    {exhibit.animalCount} Animals
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full bg-green-50 text-green-600 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300"
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Live Updates Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        {/* ... Rest of the live updates section with similar enhancements ... */}
      </section>
    </motion.div>
  )
}

export default Home