import React, { useState } from "react";

export default function DoctorProfile() {
  const [doctorId, setDoctorId] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");

  const handleFetchDoctor = async () => {
    try {
      const res = await fetch(`http://localhost:8082/api/auth/getdoctor/${doctorId}`);

      if (res.ok) {
        const data = await res.json();
        setDoctor(data);
        setError("");
      } else if (res.status === 404) {
        setDoctor(null);
        setError("Doctor not found");
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch doctor details");
      setDoctor(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Fetch Doctor Details</h2>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <button
          onClick={handleFetchDoctor}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Doctor
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {doctor && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <p><strong>ID:</strong> {doctor.id}</p>
          <p><strong>Username:</strong> {doctor.username}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Role:</strong> {doctor.role}</p>
        </div>
      )}
    </div>
  );
}
