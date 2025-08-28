import React, { useState } from "react";

export default function DeletePrescription() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!id) {
      setMessage("❌ Please enter a prescription ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8082/api/auth/pres/deleteprescription/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.text();

      if (response.ok) {
        setMessage("✅ " + result);
        setId("");
      } else {
        setMessage("❌ " + result);
      }
    } catch (error) {
      console.error("Error deleting prescription:", error);
      setMessage("❌ Failed to delete prescription.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold text-red-700 mb-4">Delete Prescription</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Prescription ID
          </label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Delete
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-red-500">
          {message}
        </p>
      )}
    </div>
  );
}
