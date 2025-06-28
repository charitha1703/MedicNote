package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.DoctorModel;

public interface DoctorRepository extends JpaRepository<DoctorModel,Integer> {
	
	Optional<DoctorModel> findByEmail(String email);

}


