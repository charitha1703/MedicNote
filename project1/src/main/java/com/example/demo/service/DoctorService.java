package com.example.demo.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Doctor;
import com.example.demo.model.Prescription;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.PrescriptionRepository;
import com.example.demo.serviceinterface.DoctorInterface;

@Service

public class DoctorService  implements DoctorInterface{
	
	@Autowired
	private DoctorRepository repo;
	
	@Autowired
	private PrescriptionRepository repo1;
	
	 @Autowired
	    private PasswordEncoder passwordEncoder;
	
	
	
	
	
	public Doctor getAllDoctors(int id)
	{
		return repo.findById(id).orElse(null);
	}

	
	
	public boolean deleteDoctor(int id)
	{
		if(repo.existsById(id))
		{
			repo.deleteById(id);
			return true;
		}
		else {
			return false;
		}
		
	}
	
	public Doctor updateDoctor(int id,Doctor updatedoctor)
	{
		
		return repo.findById(id).map(doctor->{
			
			doctor.setEmail(updatedoctor.getEmail());
			
			doctor.setUsername(updatedoctor.getUsername());
			doctor.setPassword(passwordEncoder.encode(updatedoctor.getPassword()));	
			return repo.save(doctor);
		}).orElse(null);
		
		
		
	}
	 public List<Doctor> getAllDoctors()
	 {
		return repo.findAll();
		
	 }
	@Override
	public List<Prescription> getallprescriptions(int doctorid) {
	// TODO Auto-generated method stub
		return repo1.findByDoctorId(doctorid);
	}
	 
	 
	
}

