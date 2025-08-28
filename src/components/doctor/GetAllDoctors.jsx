import React, { useEffect, useState } from "react";

export default function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/api/auth/getallthedoctors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctors.");
        }
        return response.json();
      })
      .then((data) => setDoctors(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">All Doctors</h2>

      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {doctors.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
            
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{doc.id}</td>
                <td className="py-2 px-4 border-b">{doc.username}</td>
                <td className="py-2 px-4 border-b">{doc.email}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No doctors found.</p>
      )}
    </div>
  );
}
