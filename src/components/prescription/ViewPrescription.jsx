import React, { useState } from "react";

export default function ViewPrescription() {
  const [id, setId] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [message, setMessage] = useState("");

  const handleView = async (e) => {
    e.preventDefault();
    setMessage("");
    setPrescription(null);

    if (!id) {
      setMessage("❌ Please enter a prescription ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/api/auth/pres/getprescription/${id}`);

      if (response.ok) {
        const data = await response.json();
        setPrescription(data);
        setMessage("");
      } else {
        setMessage("❌ Prescription not found.");
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
      setMessage("❌ Failed to fetch prescription.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">View Prescription</h2>

      <form onSubmit={handleView} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Prescription ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          View
        </button>
      </form>

      {message && <p className="mt-4 text-red-600 font-medium">{message}</p>}

      {prescription && (
        <div className="mt-6 bg-gray-50 border p-4 rounded">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Prescription Details:</h3>
          <p><span className="font-semibold">ID:</span> {prescription.id}</p>
          <p><span className="font-semibold">Medicine Name:</span> {prescription.medicineName}</p>
          <p><span className="font-semibold">Instructions:</span> {prescription.instructions}</p>
          {/* Add more fields if needed */}
        </div>
      )}
    </div>
  );
}
