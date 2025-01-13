//package com.blift.backend.services;
//
//import com.blift.backend.entities.Consultant;
//import com.blift.backend.repositories.ConsultantRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class ConsultantService {
//
//    @Autowired
//    private ConsultantRepository consultantRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public void register(Consultant consultant) {
//        if (consultantRepository.findByEmail(consultant.getEmail()).isPresent()) {
//            throw new IllegalArgumentException("Consultant already exists.");
//        }
//        consultant.setPassword(passwordEncoder.encode(consultant.getPassword())); // Encode password
//        consultantRepository.save(consultant);
//    }
//
//    public String login(String email, String password) {
//        Consultant consultant = consultantRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("Consultant not found."));
//        if (!passwordEncoder.matches(password, consultant.getPassword())) {
//            throw new IllegalArgumentException("Invalid credentials.");
//        }
//        return "Consultant logged in successfully.";
//    }
//
//    public List<Consultant> getAllConsultants() {
//        return consultantRepository.findAll();
//    }
//}
