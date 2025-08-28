import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Optionally, remove other info like role, username, etc.
    // localStorage.removeItem("username");

    // Redirect to welcome page of doctor
    navigate("/doctor/welcome");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <p className="text-lg font-medium text-blue-700">
        Logging out...
      </p>
    </div>
  );
}
