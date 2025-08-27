package com.example.demo.controller;



import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Doctor;
import com.example.demo.model.Prescription;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.securityconfig.JwtUtil;
import com.example.demo.serviceinterface.DoctorInterface;



@RestController
@RequestMapping("/api/auth")
public class DoctorController {
    
	

	
	
	
	@Autowired
	private DoctorInterface serv;
	
	 @Autowired
	    private DoctorRepository doctorRepo;
	 
	    @Autowired
	    private PasswordEncoder passwordEncoder;
	    
	    @Autowired
	    private JwtUtil jwtUtil;
	
	
	
	  @PostMapping("/register")
	    public ResponseEntity<?> registerDoctor(@RequestParam String username,
	                                            @RequestParam String password,@RequestParam String email) {
	        if (doctorRepo.findByUsername(username).isPresent()) {
	            return ResponseEntity.status(HttpStatus.CONFLICT)
	                                 .body("Username already exists");
	        }

	        Doctor doctor = new Doctor();
	        doctor.setUsername(username);
	        doctor.setEmail(email);
	        doctor.setPassword(passwordEncoder.encode(password)); // Hash the password
	        doctor.setRole("DOCTOR");

	        doctorRepo.save(doctor);
	        return ResponseEntity.ok("Doctor registered successfully");
	    }
	    
	    //doctor login
	    
	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
	        Optional<Doctor> doctorOpt = doctorRepo.findByUsername(username);

	        if (doctorOpt.isPresent()) {
	            Doctor doctor = doctorOpt.get();

	            if (passwordEncoder.matches(password, doctor.getPassword())) {
	                String token = jwtUtil.generateToken(doctor.getUsername(), doctor.getRole());
	                return ResponseEntity.ok(Collections.singletonMap("token", token));
	            }
	        }

	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	    }
	
	//get the doctor using id
	
	@GetMapping("/getdoctor/{id}")
	public ResponseEntity<Doctor> getAllDoctors(@PathVariable int id)
	{
		Doctor doctor=serv.getAllDoctors(id);
		if(doctor!=null)
		{
			return ResponseEntity.ok(doctor);
		}
		
			return ResponseEntity.notFound().build();		
	}
	
	//returning all the doctors
	
	@GetMapping("/getallthedoctors")
    public List<Doctor> getAllDoctors()
    {
		return serv.getAllDoctors();
	
    }
	
	
	//delete the doctor using the id
	
	@DeleteMapping("/deletedoctor/{id}")
	public ResponseEntity<String> deleteDoctor(@PathVariable int id)
	{
	            boolean body=serv.deleteDoctor(id);
	            if(body)
	            {
	            	return ResponseEntity.ok("doctor deleted successfully");
	            }
	            else {
	            	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found")	;
	            }
	            	
	            
	}
	
	//update the doctor using id
	
	@PutMapping("/updatedoctor/{id}")
	public ResponseEntity<String> updateDoctor(@PathVariable int id,@RequestBody Doctor updateddoctor)
	{
		Doctor doctor=serv.updateDoctor(id,updateddoctor);
		if(doctor!=null)
		{
			return ResponseEntity.ok("Doctor details updated successfully");
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
			}
	}
	
	// Get all the prescriptions using the doctor id
	@GetMapping("/getallprescriptions/{id}")
	public ResponseEntity<?> getallprescriptions(@PathVariable int id)
	{
		List<Prescription> prescriptions = serv.getallprescriptions(id);

        if (prescriptions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("No prescriptions found for doctor ID: " + id);
        }

        return ResponseEntity.ok(prescriptions);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
