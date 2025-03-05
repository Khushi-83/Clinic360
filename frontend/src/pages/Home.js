import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import HeroImage from "../assets/Heroimage.jpg"; 
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext); // Get logged-in user

  // 🎯 If user is a doctor, show Doctor Dashboard UI
  if (user?.role === "doctor") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
        <h1 className="text-4xl font-bold text-blue-600">Welcome, Dr. {user.name}!</h1>
        <p className="mt-4 text-lg text-gray-600">Manage your schedule and upcoming appointments.</p>
        <Link to="/doctor-dashboard" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  // 🎯 Default: Patient Homepage with Hero Image
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center">
        {/* Left Side: Hero Image */}
        <div className="w-full md:w-1/2">
          <img src={HeroImage} alt="Doctor Consultation" className="rounded-lg shadow-lg w-full h-auto" />
        </div>
        
        {/* Right Side: Text & CTA Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:pl-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 leading-tight">
            Your Health, Our Priority
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find the best doctors near you and book hassle-free appointments with just a few clicks.
          </p>
          
          {/* Search Bar */}
          <div className="mt-6 flex justify-center md:justify-start">
            <input type="text" placeholder="Search doctors, specialty, or location" className="w-3/4 p-3 rounded-l-lg text-gray-900 outline-none" />
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-r-lg">
              <FaSearch className="text-white text-lg" />
            </button>
          </div>
          
          {/* Call-to-Action Buttons */}
          <div className="mt-6 space-x-4">
            <Link to="/search" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700">
              Find Doctors
            </Link>
            <Link to="/login" className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
