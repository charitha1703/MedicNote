package com.example.demo.controller;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Doctor;
import com.example.demo.repository.DoctorRepository1;
import com.example.demo.securityconfig.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private DoctorRepository1 doctorRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
    
    
    @PostMapping("/register")
    public ResponseEntity<?> registerDoctor(@RequestParam String username,
                                            @RequestParam String password) {
        if (doctorRepo.findByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("Username already exists");
        }

        Doctor doctor = new Doctor();
        doctor.setUsername(username);
        doctor.setPassword(passwordEncoder.encode(password)); // Hash the password
        doctor.setRole("DOCTOR");

        doctorRepo.save(doctor);
        return ResponseEntity.ok("Doctor registered successfully");
    }

}

