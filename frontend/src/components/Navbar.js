import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserMd, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = null; // Replace with actual auth logic

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Clinic360
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          
          {/* Doctors Dropdown (Fixed for mobile) */}
          <div className="relative">
            <button 
              className="text-gray-700 flex items-center hover:text-blue-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserMd className="mr-1" /> Doctors
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-40">
                <Link 
                  to="/search" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Find a Doctor
                </Link>
                <Link 
                  to="/specialties" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Specialties
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>

          {/* Search Bar */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input 
              type="text" 
              placeholder="Search doctors..." 
              className="px-3 py-2 outline-none text-gray-700"
            />
            <button className="bg-blue-600 px-3 py-2 text-white">
              <FaSearch />
            </button>
          </div>

          {/* Authentication Buttons */}
          {user ? (
            <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <Link to="/" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/search" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>Find Doctors</Link>
          <Link to="/specialties" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>Specialties</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>Contact</Link>

          {/* Search Bar */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input 
              type="text" 
              placeholder="Search doctors..." 
              className="px-3 py-2 w-full outline-none text-gray-700"
            />
            <button className="bg-blue-600 px-3 py-2 text-white">
              <FaSearch />
            </button>
          </div>

          {/* Authentication Buttons */}
          {user ? (
            <Link to="/dashboard" className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="block bg-yellow-500 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsOpen(false)}>
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
