package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Prescription;

public interface PrescriptionRepository  extends JpaRepository<Prescription,Integer>{
	
	

}
