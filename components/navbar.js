
export default function Navbar() {
    return (
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img src="https://i.ibb.co/b3b0k3A/Parrot-Logo.png" alt="Parrot Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Parrot</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-semibold">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-semibold">Use cases</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-semibold">Alternatives</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-semibold">Grammar</a>
            </nav>
          </div>
          <a href="#" className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600">
            Get the App
          </a>
        </div>
      </header>
    );
  }
  