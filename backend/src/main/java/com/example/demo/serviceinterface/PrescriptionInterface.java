package com.example.demo.serviceinterface;

import java.util.List;

import com.example.demo.model.Prescription;

public interface PrescriptionInterface {
	void addPrescription(Prescription prescription);
	Prescription getPrescriptionById(int id);
	List<Prescription> getAllPrescription();
	boolean delPrescription(int id);
	Prescription updatedPrescription(int id,Prescription updatedprescription);
	byte[] generatePrescriptionPdf(int id) throws Exception;

}
