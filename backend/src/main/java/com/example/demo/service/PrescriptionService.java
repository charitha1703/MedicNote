package com.example.demo.service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Doctor;
import com.example.demo.model.Patient;
import com.example.demo.model.Prescription;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.PrescriptionRepository;
import com.example.demo.serviceinterface.PrescriptionInterface;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
@Service
public class PrescriptionService implements PrescriptionInterface {
	
	

	
	@Autowired
	private PatientRepository patientRepository;
	@Autowired
	private PrescriptionRepository repo1;
	
	public void addPrescription(Prescription prescription) {
		
		Patient patient = patientRepository.findById(prescription.getPatient().getId())
	            .orElseThrow(() -> new RuntimeException("Patient not found"));
		prescription.setPatient(patient);
	Prescription p=new Prescription();
	p.setMedicineName(prescription.getMedicineName());
	p.setInstructions(prescription.getInstructions());
	p.setPatient(prescription.getPatient());
		 repo1.save(prescription);
		
	}
	
	public Prescription getPrescriptionById(int id)
	{
		return repo1.findById(id).orElse(null);
		
		
		
	}
	public List<Prescription> getAllPrescription() {
		
		return repo1.findAll();
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
	

    public byte[] generatePrescriptionPdf(int id) throws Exception {
        Optional<Prescription> opt = repo1.findById(id);
        if (opt.isEmpty()) {
            return null;
        }

        Prescription p = opt.get();
        Patient patient=p.getPatient();
        Doctor doctor=patient.getDoctor();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, out);
        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Font textFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        document.add(new Paragraph("Digital Prescription", titleFont));
        document.add(new Paragraph(" ")); // spacer
        document.add(new Paragraph("Doctor: " + doctor.getId(), textFont));
        document.add(new Paragraph("Patient: " + patient.getName(), textFont));
        document.add(new Paragraph("Instructions: " + p.getInstructions(), textFont));
        document.add(new Paragraph("Medicine name: " + p.getMedicineName(), textFont));

        document.close();

        return out.toByteArray();
    }
}


	
	
	

