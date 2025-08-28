package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Doctor;
import com.example.demo.model.Prescription;


public interface DoctorRepository extends JpaRepository<Doctor,Integer> {
	
	
	 Optional<Doctor> findByUsername(String username);
	
	

}


