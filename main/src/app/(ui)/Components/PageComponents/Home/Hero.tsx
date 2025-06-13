
const Hero = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4">
            Welcome to 100x<span className="text-blue-600">Code</span>
          </h2>
          <p className="text-lg text-gray-400 mb-6">
            A place for collaboration, learning resources, and event management.
          </p>
          <div className="space-x-4">
            <a
              href="#features"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
            >
              Get Started
            </a>
            <a
              href="#events"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md text-white"
            >
              Explore Events
            </a>
          </div>
        </div>
    </div>
  )
}

export default Hero
