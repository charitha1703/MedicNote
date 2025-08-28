import React, { useState } from "react";

export default function AddPrescription() {
  const [medicineName, setMedicineName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8082/api/auth/pres/addprescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Add JWT token
        },
        body: JSON.stringify({ medicineName, instructions }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage("✅ " + data);
        setMedicineName("");
        setInstructions("");
      } else {
        setMessage("❌ " + data);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add prescription");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Add Prescription</h2>
      <form onSubmit={handleAdd} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Medicine Name</label>
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Add Prescription
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
}
