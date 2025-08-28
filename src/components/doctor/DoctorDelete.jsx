import React, { useState } from "react";

export default function DoctorDelete() {
  const [doctorId, setDoctorId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!doctorId) {
      setMessage("Please enter a doctor ID");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8082/api/auth/deletedoctor/${doctorId}`, {
        method: "DELETE",
      });

      const text = await res.text();
      if (res.ok) {
        setMessage("✅ " + text);
      } else {
        setMessage("❌ " + text);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error deleting doctor");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Delete Doctor</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <input
          type="number"
          placeholder="Enter Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Delete Doctor
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
