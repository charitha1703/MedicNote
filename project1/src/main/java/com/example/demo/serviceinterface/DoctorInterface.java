package com.example.demo.serviceinterface;

import java.util.List;

import com.example.demo.model.Doctor;
import com.example.demo.model.Prescription;

public interface DoctorInterface {
	
	Doctor getAllDoctors(int id);
	boolean  deleteDoctor(int id);
	Doctor updateDoctor(int id,Doctor updatedoctor);
	List<Doctor>getAllDoctors();
	List<Prescription>getallprescriptions(int id);

}
