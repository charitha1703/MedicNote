package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Doctor;
import com.example.demo.model.Patient;

public interface PatientRepository extends JpaRepository<Patient,Integer> {
  
	
	 Optional<Patient> findByUsername(String username);
}
