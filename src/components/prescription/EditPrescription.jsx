import React, { useState } from "react";

export default function EditPrescription() {
  const [id, setId] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8082/api/auth/pres/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Add JWT token
        },
        body: JSON.stringify({ medicineName, instructions }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage("✅ " + data);
        setId("");
        setMedicineName("");
        setInstructions("");
      } else {
        setMessage("❌ " + data);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update prescription");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold text-yellow-700 mb-4">Edit Prescription</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Prescription ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
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
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
        >
          Update Prescription
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
}
