package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Patient;
import com.example.demo.repository.PatientRepository;
import com.example.demo.serviceinterface.PatientInterface;

@Service
public class PatientService implements PatientInterface {
	
	@Autowired
	PatientRepository patientrepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public boolean  register(Patient patient)
	{
		
		if(patientrepository.findByUsername(patient.getUsername()).isPresent())
		{
			return false;
		}
		else {
			
			Patient p=new Patient();
			p.setName(patient.getName());
			p.setPassword(passwordEncoder.encode(patient.getPassword()));
			p.setPhoneNumber(patient.getPhoneNumber());
			p.setReason(patient.getReason());
			p.setUsername(patient.getUsername());
			p.setDoctor(patient.getDoctor());
		 patientrepository.save(p);
		 return true;
		}
	}
	
	public boolean login(String username,String password)
	{
		Optional<Patient>option=patientrepository.findByUsername(username);
		
		if(option.isPresent())
		{
			Patient patient=option.get();
			if(passwordEncoder.matches(password, patient.getPassword()))
					{
				return true;
					}
		}
		
		return false;
		
		
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
			patient.setUsername(updatedpatient.getUsername());
			patient.setPassword(passwordEncoder.encode(updatedpatient.getPassword()));
			return patientrepository.save(patient);
		}).orElse(null);
		}
		else {
			return null;
		}
		}
			
		
	}
	
	

