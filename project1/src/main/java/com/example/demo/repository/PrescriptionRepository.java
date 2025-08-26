package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Prescription;

public interface PrescriptionRepository  extends JpaRepository<Prescription,Integer>{
	
	// @Query("SELECT p FROM Prescription p WHERE p.patient.doctor.id = :doctorId")
	@Query("SELECT p FROM Prescription p " +
		       "JOIN p.patient pt " +
		       "WHERE pt.doctor.id = :doctorId")
	    List<Prescription> findByDoctorId(@Param("doctorId") int doctorId);
	

}
