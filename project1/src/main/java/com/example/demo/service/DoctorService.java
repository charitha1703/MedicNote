package com.example.demo.service;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.DoctorModel;
import com.example.demo.repository.DoctorRepository;

@Service

public class DoctorService {
	
	@Autowired
	private DoctorRepository repo;
	
	
	public DoctorModel register(DoctorModel doctormodel)
	{
		
	
		return repo.save(doctormodel);
	}
	
	public boolean login(String email,String password)
	{
		Optional<DoctorModel>user=repo.findByEmail(email);
		return user.isPresent() && user.get().getPassword().equals(password);
	}
	
	
	
	public DoctorModel getAllDoctors(int id)
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
	
	public DoctorModel updateDoctor(int id,DoctorModel updatedoctor)
	{
		
		return repo.findById(id).map(doctor->{
			
			doctor.setEmail(updatedoctor.getEmail());
			doctor.setPassword(updatedoctor.getPassword());	
			return repo.save(doctor);
		}).orElse(null);
		
		
		
	}
	 public List<DoctorModel> getAllDoctors()
	 {
		return repo.findAll();
		
	 }
	
}

