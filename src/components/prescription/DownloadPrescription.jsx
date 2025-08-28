import React, { useState } from "react";

export default function DownloadPrescription() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!id) {
      setMessage("❌ Please enter a valid prescription ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8082/api/auth/pres/download/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setMessage("❌ Prescription not found or error occurred.");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `prescription_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage("✅ Prescription downloaded successfully.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error downloading prescription.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Download Prescription</h2>
      <form onSubmit={handleDownload} className="space-y-4">
        <div>
          <label className="block text-gray-700">Prescription ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Download PDF
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-green-700">{message}</p>
      )}
    </div>
  );
}
