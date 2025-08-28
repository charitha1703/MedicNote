import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientRegister() {

  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phonenumber: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:8082/api/auth/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage("✅ Registered successfully!");
        setTimeout(() => navigate("/login"), 2000); // Redirect after success
      } else {
        setMessage("❌ " + result);
      }
    } catch (err) {
      setMessage("❌ Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Patient Registration</h2>

        {message && (
          <div className="text-center mb-4 text-sm font-medium text-red-600">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
