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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Patient;
import com.example.demo.serviceinterface.PatientInterface;

@RestController
@RequestMapping("api/auth/patient")
public class PatientController {
	
	
	@Autowired
	PatientInterface patientservice;
	
	@PostMapping("/register")
	public ResponseEntity<String>  register(@RequestBody Patient patient)
	{
		
		if(patientservice.register(patient)==false)
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).body("username already exist");
		}
		else {
			return ResponseEntity.ok("patient added successfully");
		}
		
		
		 
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String username,@RequestParam String password)
	{
		
		if(patientservice.login(username,password)==true)
		{
			return ResponseEntity.ok("login successfull");
		}
		else {
			return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("invalid username or password");
		}
		
		
	}
	
	@GetMapping("/getpatient/{id}")
	public ResponseEntity<Patient> getPatient(@PathVariable int id)
	{
		Patient patient=patientservice.getPatient(id);
		if(patient!=null)
		{
			return ResponseEntity.ok(patient);
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	
	
	@GetMapping("/getallpatients")
	public List<Patient> getAllPatient()
	{
		return patientservice.getAllPatients();
	}
	
	
	
	@DeleteMapping("/deletepatient/{id}")
	public ResponseEntity<String> deletePatient(@PathVariable int id){
		boolean body=patientservice.deletePatient(id);
		if(body)
		{
			return ResponseEntity.ok("deleted successfully");
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("patient not found");
		}
	}
	
	
	@PutMapping("/updatepatient/{id}")
	public ResponseEntity<String> updatePatient(@PathVariable int id,@RequestBody Patient updatedpatient)
	{
		 Patient patient=patientservice.updatePatient(id,updatedpatient);
		 if(patient!=null)
		 {
			 return ResponseEntity.ok("patient updated successfully");
		 }
		 else {
			 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("patient not found");
		 }
	}

}
