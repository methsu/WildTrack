const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WildTrack</h3>
            <p className="text-green-300">Interactive Zoo Management System</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/visit" className="hover:text-green-300">Plan Your Visit</a></li>
              <li><a href="/map" className="hover:text-green-300">Zoo Map</a></li>
              <li><a href="/contact" className="hover:text-green-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {/* Add social media icons */}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
              />
              <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center">
          <p>&copy; 2025 WildTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer