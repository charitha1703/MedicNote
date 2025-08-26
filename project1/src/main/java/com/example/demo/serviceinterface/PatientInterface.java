package com.example.demo.serviceinterface;

import java.util.List;

import com.example.demo.model.Patient;

public interface PatientInterface {
	boolean  register(Patient patient);
	boolean login(String username,String password);
	 Patient getPatient(int id);
	 List<Patient> getAllPatients();
	 boolean deletePatient(int id);
	 Patient updatePatient(int id,Patient updatedpatient);

}
