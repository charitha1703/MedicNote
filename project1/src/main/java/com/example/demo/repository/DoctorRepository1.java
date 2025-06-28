package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Doctor;

public interface DoctorRepository1 extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUsername(String username);
}

