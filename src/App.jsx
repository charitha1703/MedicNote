import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorRegister from "./components/doctor/DoctorRegister";
import DoctorLogin from "./components/doctor/DoctorLogin";
import DoctorUpdate from "./components/doctor/DoctorUpdate";
import DoctorDelete from "./components/doctor/DoctorDelete";
import DoctorProfile from "./components/doctor/DoctorProfile";
import PatientRegister from "./components/patient/PatientRegister";
import PatientLogin from "./components/patient/PatientLogin";
import ViewPrescription from "./components/prescription/ViewPrescription";
import DownloadPrescription from "./components/prescription/DownloadPrescription";
import Welcome from "./components/doctor/Welcome";
import DoctorWelcome from "./components/doctor/DoctorWelcome";
import PatientWelcome from "./components/patient/PatientWelcome";
import DoctorLogout from "./components/doctor/DoctorLogout";
import AddPrescription from "./components/prescription/AddPrescription";
import EditPrescription from "./components/prescription/EditPrescription";
import DeletePrescription from "./components/prescription/DeletePrescription";
import PatientLogout from "./components/patient/PatientLogout";
import GetAllDoctors from "./components/doctor/GetAllDoctors";
import GetAllPatients from "./components/patient/GetAllPatients";
import GetAllPrescritpion from "./components/prescription/GetAllPrescription";
export default function App() {
  return (
    

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} /> {/* ✅ Default Route */}
        <Route path="/doctor/welcome" element={<DoctorWelcome />} />
         <Route path="/patient/welcome" element={<PatientWelcome />} />
         <Route path="/doctor/logout" element={<DoctorLogout />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/update" element={<DoctorUpdate token="your-token" />} />
        <Route path="/doctor/delete" element={<DoctorDelete  token="your-token" />} />
        <Route path="/doctor/profile" element={<DoctorProfile  token="your-token" />} />
        <Route path="/doctor/getallprofile" element={<GetAllDoctors  token="your-token" />} />
        <Route path="/patient/getallpatients" element={<GetAllPatients  token="your-token" />} />
      
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/patient/login" element={<PatientLogin onLogin={() => {}} />} />
          <Route path="/patient/logout" element={<PatientLogout />} />
         <Route path="/prescription/view" element={<ViewPrescription  />} />
        <Route path="/prescription/add" element={<AddPrescription  />} />
        <Route path="/prescription/edit" element={<EditPrescription  />} />
         <Route path="/prescription/delete" element={<DeletePrescription  />} />
             <Route path="/prescription/getallprescription" element={<GetAllPrescritpion  />} />
        <Route path="/prescription/download" element={<DownloadPrescription prescriptionId={1} />} />
      </Routes>
    </BrowserRouter>
    
  );
}


/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PrescriptionManager() {
  const [doctorPrescriptions, setDoctorPrescriptions] = useState([]);
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [token, setToken] = useState(""); // JWT token for auth

  // Fetch prescriptions for doctor
  const fetchDoctorPrescriptions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/prescription/getallprescription", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctorPrescriptions(res.data);
    } catch (err) {
      console.error("Error fetching doctor prescriptions", err);
    }
  };

  // Fetch prescriptions for patient
  const fetchPatientPrescriptions = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/prescription/getbypatient/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatientPrescriptions(res.data);
    } catch (err) {
      console.error("Error fetching patient prescriptions", err);
    }
  };

  // Add prescription (Doctor)
  const handleAddPrescription = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/prescription/add",
        {
          medicineName,
          instructions,
          patient: { id: patientId },
          doctor: { id: doctorId },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMedicineName("");
      setInstructions("");
      fetchDoctorPrescriptions();
    } catch (err) {
      console.error("Error adding prescription", err);
    }
  };

  // Delete prescription (Doctor)
  const handleDeletePrescription = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/prescription/deleteprescription/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDoctorPrescriptions();
    } catch (err) {
      console.error("Error deleting prescription", err);
    }
  };

  // Download prescription (Patient)
  const handleDownloadPrescription = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/prescription/download/${id}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `prescription_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error downloading prescription", err);
    }
  };

  return (
    <div className="p-6">
      {/* Navbar }
      <nav className="flex justify-between bg-blue-600 p-4 rounded-xl shadow-md text-white">
        <h1 className="text-xl font-bold">💊 Digital Prescription Manager</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => alert("Home clicked")}>
            Home
          </Button>
          <Button variant="outline" onClick={() => alert("Register clicked")}>
            Register
          </Button>
          <Button variant="outline" onClick={() => alert("Login clicked")}>
            Login
          </Button>
        </div>
      </nav>

      {/* Tabs for Doctor & Patient }
      <Tabs defaultValue="doctor" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="doctor">👨‍⚕️ Doctor</TabsTrigger>
          <TabsTrigger value="patient">🧑‍🤝‍🧑 Patient</TabsTrigger>
        </TabsList>

        {/* Doctor Section }
        <TabsContent value="doctor">
          <Card className="mt-4 p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-3">Manage Prescriptions</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Medicine Name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="border p-2 rounded w-40"
              />
              <input
                type="text"
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="border p-2 rounded w-60"
              />
              <input
                type="number"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="border p-2 rounded w-28"
              />
              <input
                type="number"
                placeholder="Doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="border p-2 rounded w-28"
              />
              <Button onClick={handleAddPrescription}>➕ Add</Button>
            </div>

            <Button onClick={fetchDoctorPrescriptions} className="mb-3">
              🔄 Refresh Prescriptions
            </Button>

            <CardContent>
              {doctorPrescriptions.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>
                    <b>{p.medicineName}</b> - {p.instructions}
                  </span>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeletePrescription(p.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patient Section }
        <TabsContent value="patient">
          <Card className="mt-4 p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-3">View & Download Prescriptions</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Enter Patient ID"
                onChange={(e) => fetchPatientPrescriptions(e.target.value)}
                className="border p-2 rounded w-40"
              />
            </div>

            <CardContent>
              {patientPrescriptions.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>
                    <b>{p.medicineName}</b> - {p.instructions}
                  </span>
                  <Button onClick={() => handleDownloadPrescription(p.id)}>
                    ⬇️ Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}*/

