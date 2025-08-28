import React, { useEffect, useState } from "react";

export default function AllPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/auth/pres/getallprescription");

      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
        setMessage("");
      } else {
        const errorText = await response.text();
        setPrescriptions([]);
        setMessage(errorText || "No prescriptions found.");
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setMessage("❌ Failed to fetch prescriptions.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        All Prescriptions
      </h2>

      {message && (
        <p className="text-red-600 text-center mb-4 font-medium">{message}</p>
      )}

      {prescriptions.length > 0 && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <p>
                <span className="font-semibold">ID:</span> {prescription.id}
              </p>
              <p>
                <span className="font-semibold">Medicine:</span>{" "}
                {prescription.medicineName}
              </p>
              <p>
                <span className="font-semibold">Instructions:</span>{" "}
                {prescription.instructions}
              </p>
              
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
