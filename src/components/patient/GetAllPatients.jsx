import React, { useEffect, useState } from "react";

export default function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/auth/patient/getallpatients");

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("❌ Could not load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">All Registered Patients</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading patients...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-gray-600">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
               
                <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                {/* Add more columns if your Patient object has more fields */}
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{patient.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{patient.name}</td>
                
                  <td className="border border-gray-300 px-4 py-2">{patient.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
