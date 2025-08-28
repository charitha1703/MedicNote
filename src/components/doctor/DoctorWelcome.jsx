
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

export default function DoctorWelcome() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/stethoscope-copy-space.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-50 min-h-screen">
        {/* Navbar */}
        <nav className="bg-blue-700 bg-opacity-90 text-white px-8 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">🩺 Doctor Portal</h1>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
            {!isLoggedIn && (
              <>
                <Link to="/doctor/register" className="hover:text-yellow-300 transition">
                  Register
                </Link>
                <Link to="/doctor/login" className="hover:text-yellow-300 transition">
                  Login
                </Link>
              </>
            )}
           
           {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-yellow-300 transition"
              >
                More ▾
              </button>
               
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded shadow-lg z-10">
                  <Link to="/prescription/view" className="block px-4 py-2 hover:bg-gray-100">View Prescription</Link>
                 {/* <Link to="/doctor/update" className="block px-4 py-2 hover:bg-gray-100">Update Doctor</Link>
                  <Link to="/doctor/profile" className="block px-4 py-2 hover:bg-gray-100">Get Doctor</Link>
                  <Link to="/doctor/delete" className="block px-4 py-2 hover:bg-gray-100">Delete Doctor</Link>*/}
                  <Link to="/doctor/getallprofile" className="block px-4 py-2 hover:bg-gray-100">Doctor List</Link>
                   <Link
              to="/prescription/getallprescription"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Get All Prescription
            </Link>
                    {/* Show Logout only if logged in */}
                  {isLoggedIn && (
                  <Link to="/patient/getallpatients" className="block px-4 py-2 hover:bg-gray-100">Patient List</Link>
                    
                  )}
                  {/* Show Logout only if logged in */}
                  {isLoggedIn && (
                    <Link to="/doctor/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
                    
                  )}
                  
                </div>
              )}
            </div>
            )}
          </div>
        </nav>

        {/* Welcome Message */ }
        <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome, Doctor!</h2>
          <p className="text-lg max-w-2xl mb-6">
            Access your dashboard to manage patients and prescriptions securely.
          </p>

          {/* Show prescription actions only when logged in */ }
          {isLoggedIn ? (
            <div className="flex gap-6 flex-wrap justify-center">
              <Link to="/prescription/add" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition">Add Prescription</Link>
              <Link to="/prescription/edit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded shadow transition">Edit Prescription</Link>
              <Link to="/prescription/delete" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow transition">Delete Prescription</Link>
            </div>
          ) : (
            <p className="text-red-300 font-medium">You must be logged in to manage prescriptions.</p>
          )}
        </main>
      </div>
    </div>
  );
}
