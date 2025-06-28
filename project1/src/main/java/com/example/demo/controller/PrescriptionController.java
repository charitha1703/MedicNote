package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Prescription;
import com.example.demo.repository.PrescriptionRepository;
import com.example.demo.service.PrescriptionService;

@RestController
@RequestMapping("/api/auth/pres")

public class PrescriptionController {
   
	
	@Autowired
	private PrescriptionService prescriptionservice;
    
	@Autowired
	PrescriptionRepository prescriptionrepository;
    
    
    
	/*@PostMapping("/addprescription")
	public String addPrescription(@RequestBody Prescription prescription)
	{
		
		
    	prescriptionservice.addPrescription(prescription);
		return "prescription added successfully";
	}*/
    @GetMapping("/{id}")
    public ResponseEntity<?> getPrescription(@PathVariable Long id) {
        return ResponseEntity.ok("Details for prescription " + id);
    }
    
    
   /* @GetMapping("/getprescription/{id}")
	public ResponseEntity<Prescription> getPrescriptionById(@PathVariable int id)
	{
		Prescription pres=prescriptionservice.getPrescriptionById(id);
		
		if(pres!=null)
		{
			return ResponseEntity.ok(pres);
		}
		else {
			return ResponseEntity.notFound().build();
		}
		
	}*/
    
    @GetMapping("/getallprescription")
    public List<Prescription> getAllPrescription()
    {
    	return prescriptionservice.getAllPrescription();
    }
    
    
    
    @DeleteMapping("/deleteprescription/{id}")
    public ResponseEntity<String> delPrescriptionById(@PathVariable int id)
    {
    	boolean body=prescriptionservice.delPrescription(id);
    	if(body)
    	{
    		return ResponseEntity.ok("prescription deleted successfully");
    	}
    	else {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("prescription not found");
    	}
    	
    }
    
    
    
    
    /*@PutMapping("/updateprescription/{id}")
    public ResponseEntity<String> updatePrescription(@PathVariable int id,@RequestBody Prescription updatedprescription)
    {
    	Prescription prescription=prescriptionservice.updatePrescription(id,updatedprescription);
    	if(prescription!=null)
    	{
    	return ResponseEntity.ok("prescription added successfully");
    	}
    	else {
    		  return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Prescription not found.");
    	}
    }*/
    
    
   

       
        
  

    @PutMapping("/{id}")
   
    public ResponseEntity<?> updatePrescription(@PathVariable int id, @RequestBody Prescription updatedprescription) {
        Optional<Prescription> optional = prescriptionrepository.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Prescription existing = optional.get();
        existing.setMedicineName(updatedprescription.getMedicineName());
        existing.setInstructions(updatedprescription.getInstructions());

        prescriptionrepository.save(existing);

        return ResponseEntity.ok("Prescription updated successfully");
        
    
        
        /*if(prescriptionservice.updatedPrescription(id,updatedprescription)==null)
        {
        	return ResponseEntity.notFound().build();
        }
        else {
        	return ResponseEntity.ok("Prescription updated successfully");
        }*/
        
    }
}

    
    


    
    
    

