package com.example.demo.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.DoctorModel;
import com.example.demo.service.DoctorService;



@RestController
@RequestMapping("/api/auth")
public class DoctorController {
    
	

	@Autowired
	private DoctorService service;
	
	
	
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody DoctorModel doctormodel)
	{
		service.register(doctormodel);
		return ResponseEntity.ok("User registered successfully");
		
	}
	
	
	
	
	@PostMapping("/login")
	public String login(@RequestBody DoctorModel doctormodel)
	{
		boolean isLogin=service.login(doctormodel.getEmail(),doctormodel.getPassword());
	    return isLogin ? "login successfull!":"invalid credantials!";
	}
	
	
	
	@GetMapping("/getalldoctors/{id}")
	public ResponseEntity<DoctorModel> getAllDoctors(@PathVariable int id)
	{
		DoctorModel doctor=service.getAllDoctors(id);
		if(doctor!=null)
		{
			return ResponseEntity.ok(doctor);
		}
		
			return ResponseEntity.notFound().build();		
	}
	
	
	@GetMapping("/getallthedoctors")
    public List<DoctorModel> getAllDoctors()
    {
		return service.getAllDoctors();
	
    }
	
	@DeleteMapping("/deletedoctor/{id}")
	public ResponseEntity<String> deleteDoctor(@PathVariable int id)
	{
	            boolean body=service.deleteDoctor(id);
	            if(body)
	            {
	            	return ResponseEntity.ok("doctor deleted successfully");
	            }
	            else {
	            	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found")	;
	            }
	            	
	            
	}
	
	
	@PutMapping("/updatedoctor/{id}")
	public ResponseEntity<String> updateDoctor(@PathVariable int id,@RequestBody DoctorModel updateddoctor)
	{
		DoctorModel doctor=service.updateDoctor(id,updateddoctor);
		if(doctor!=null)
		{
			return ResponseEntity.ok("Doctor details updated successfully");
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
			}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
