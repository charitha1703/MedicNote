package com.example.demo.controller;





import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.example.demo.serviceinterface.PrescriptionInterface;

@RestController
@RequestMapping("/api/auth/pres")

public class PrescriptionController {
   
	
	@Autowired
	private PrescriptionInterface prescriptionservice;
    
	@Autowired
	PrescriptionRepository prescriptionrepository;
    
    
	//add the prescription
	
	 @PostMapping("/addprescription")
	    public ResponseEntity<?> addPrescritpion(@RequestBody Prescription prescription)
	    {
		 //System.out.println("DEBUG => Doctor: " + prescription.getDoctor());
		    System.out.println("DEBUG => Patient: " + prescription.getPatient());
	    	 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    	 
	    	 if (authentication == null || !authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_DOCTOR"))) {
	             return ResponseEntity.status(403).body("Only doctors can add prescriptions");
	         }
	    	 
	    	 
	    	prescriptionservice.addPrescription(prescription);
	    	return ResponseEntity.ok("prescription added successfully");
	    }
	
    
    //get the prescription by id
    
    @GetMapping("/getprescription/{id}")
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
		
	}
    
    //get all the prescriptions
    
    @GetMapping("/getallprescription")
    public ResponseEntity<?> getAllPrescription()
    {
    	if(prescriptionservice.getAllPrescription().size()==0)
    	{
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("prescriptions are empty");
    	}
    	else {
    		return ResponseEntity.ok(prescriptionservice.getAllPrescription());
    	}
   
    }
    
   // delete the prescription 
    
    @DeleteMapping("/deleteprescription/{id}")
    public ResponseEntity<String> delPrescriptionById(@PathVariable int id)
    {
    	
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	 
    	 if (authentication == null || !authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_DOCTOR"))) {
             return ResponseEntity.status(403).body("Only doctors can add prescriptions");
         }
    	 
    	 
    	boolean body=prescriptionservice.delPrescription(id);
    	if(body)
    	{
    		return ResponseEntity.ok("prescription deleted successfully");
    	}
    	else {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("prescription not found");
    	}
    	
    }  
  
    //update the prescription

    @PutMapping("/{id}")
   
    public ResponseEntity<?> updatePrescription(@PathVariable int id, @RequestBody Prescription updatedprescription) {
        
    	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

          // 🔍 Check if user has ROLE_DOCTOR
    	  
          if (authentication == null || !authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_DOCTOR"))) {
              return ResponseEntity.status(403).body("Only doctors can update prescriptions");
          }
    	
    	
    	
    	
    	/*Optional<Prescription> optional = prescriptionrepository.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Prescription existing = optional.get();
        existing.setMedicineName(updatedprescription.getMedicineName());
        existing.setInstructions(updatedprescription.getInstructions());

        prescriptionrepository.save(existing);

        return ResponseEntity.ok("Prescription updated successfully");*/
        
    
        
        if(prescriptionservice.updatedPrescription(id,updatedprescription)==null)
        {
        	return ResponseEntity.notFound().build();
        }
        else {
        	return ResponseEntity.ok("Prescription updated successfully");
        }
        
    }
    
   
   
    
    
    
    
    
   

        @GetMapping("/download/{id}")
        public ResponseEntity<byte[]> downloadPrescription(@PathVariable int id) {
            try {
                byte[] pdf = prescriptionservice.generatePrescriptionPdf(id);

                if (pdf == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDisposition(ContentDisposition.builder("attachment")
                        .filename("prescription_" + id + ".pdf")
                        .build());

                return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
    }





    
   

        
    



    
    


    
    
    

