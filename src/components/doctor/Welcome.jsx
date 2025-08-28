
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleDoctorClick = () => {
    navigate("/doctor/welcome");
  };

  const handlePatientClick = () => {
    navigate("/patient/welcome");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/welcomepage.jpg')", // 
      }}
    >
      {/* Optional: Overlay to darken background for readability */}
      <div className="bg-black bg-opacity-50 min-h-screen flex items-center justify-center">
        <main className="flex flex-col items-center justify-center mt-12 px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black-300 mb-8 drop-shadow-lg">
            Welcome to Digital Prescription Manager
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
            {/* Doctor */}
            <div
              onClick={handleDoctorClick}
              className="cursor-pointer bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl border border-blue-100 transition hover:scale-105 hover:shadow-2xl duration-300"
            >
              <h3 className="text-3xl font-bold text-blue-600 mb-3">👨‍⚕️ Doctor</h3>
              <p className="text-gray-700">
                Click to enter the Doctor Portal to manage prescriptions.
              </p>
            </div>

            {/* Patient */}
            <div
              onClick={handlePatientClick}
              className="cursor-pointer bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl border border-green-100 transition hover:scale-105 hover:shadow-2xl duration-300"
            >
              <h3 className="text-3xl font-bold text-green-600 mb-3">🧑‍🦱 Patient</h3>
              <p className="text-gray-700">
                Click to enter the Patient Portal to view prescriptions.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


