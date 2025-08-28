import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PatientWelcome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists in localStorage (simple login check)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-green-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">🧑‍⚕️ Patient Portal</h1>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          {!isLoggedIn  && (
            <>
          <Link to="/patient/register" className="hover:text-yellow-300 transition">
            Register
          </Link>
          <Link to="/patient/login" className="hover:text-yellow-300 transition">
            Login
          </Link> 
          </>
        )}
           
          {/* Show Logout only if logged in */}
                            {isLoggedIn && (
                              <Link to="/patient/logout" className="hover:text-yellow-300 transition">Logout</Link>
                            )}
        </div>
      </nav>

      {/* Welcome Section */}
      <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
        <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome,patient!</h2>
        <p className="text-gray-700 text-lg mb-6 max-w-2xl">
          You can view and download your medical prescriptions securely.
        </p>

        {/* Conditional Buttons */}
        {isLoggedIn ? (
          <div className="space-x-4">
            <Link
              to="/prescription/view"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            >
              View Prescription
            </Link>
            <Link
              to="/prescription/download"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            >
              Download Prescription
            </Link>
           
          </div>
        ) : (
          <p className="text-red-600 font-medium">
            Please login to view your prescriptions.
          </p>
        )}
      </main>
    </div>
  );
}
