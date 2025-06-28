package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Prescription;
import com.example.demo.repository.PrescriptionRepository;
@Service
public class PrescriptionService {
	
	
	
	@Autowired
	private PrescriptionRepository repo1;
	
	public void addPrescription(Prescription prescription) {
		// TODO Auto-generated method stub
		 repo1.save(prescription);
		
	}
	
	public Prescription getPrescriptionById(int id)
	{
		return repo1.findById(id).orElse(null);
		
		//return pres.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(404).body("prescription not found"));
		
	}
	
	public boolean delPrescription(int id)
	{
		if(repo1.existsById(id))
		{
			repo1.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
	/*public Prescription updatePrescription(int id,Prescription updatedprescription)
	{
		 return repo1.findById(id).map(prescription -> {
			   
	            prescription.setTimeOfUse(updatedprescription.getTimeOfUse());
	            prescription.setDoctorName(updatedprescription.getDoctorName());
	            prescription.setMedicineName(updatedprescription.getMedicineName());
	            return repo1.save(prescription);
	        }).orElse(null);
		
		
	}*/
	

	public Prescription updatedPrescription(int id,Prescription updatedprescription)
	{
		
		Optional<Prescription >exist=repo1.findById(id);
		
		if(exist.isEmpty())
		{
			return null;
		}
		else {
			Prescription existing=exist.get();
			existing.setMedicineName(updatedprescription.getMedicineName());
			existing.setInstructions(updatedprescription.getInstructions());
			
			repo1.save(existing);
			
			return existing;
		}
		
		
		
	}
	
	
	public List<Prescription> getAllPrescription() {
		// TODO Auto-generated method stub
		return repo1.findAll();
	}
}
