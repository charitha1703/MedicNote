package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Patient;
import com.example.demo.repository.PatientRepository;

@Service
public class PatientService {
	
	@Autowired
	PatientRepository patientrepository;
	
	public Patient register(Patient patient)
	{
		
		
		 return patientrepository.save(patient);
	}
	
	public Patient getPatient(int id)
	{
		return patientrepository.getById(id);
	}
	
	public List<Patient> getAllPatients()
	{
		return patientrepository.findAll();
	}
	
	
	public boolean deletePatient(int id)
	{
		if(patientrepository.existsById(id))
		{
			patientrepository.deleteById(id);
			return true;
		}
		else {
			return false;
		}
			
			
			}
    
	public Patient updatePatient(int id,Patient updatedpatient)
	{
		
		if(patientrepository.existsById(id))
		{
		return patientrepository.findById(id).map(patient->{
			patient.setName(updatedpatient.getName());
			patient.setReason(updatedpatient.getReason());
			return patientrepository.save(patient);
		}).orElse(null);
		}
		else {
			return null;
		}
		}
			
		
	}
	
	

