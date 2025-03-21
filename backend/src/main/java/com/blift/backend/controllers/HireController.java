package com.blift.backend.controllers;

import com.blift.backend.dto.ConsultantResponse;
import com.blift.backend.dto.HireRequestDTO;
import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.HireRequest;
import com.blift.backend.entities.User;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.HireRequestRepository;
import com.blift.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rcics")
public class HireController {

    @Autowired
    private HireRequestRepository hireRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConsultantRepository consultantRepository;

    @GetMapping
    public ResponseEntity<List<ConsultantResponse>> getAllRCICs() {
        List<ConsultantResponse> consultants = consultantRepository.findAll()
                .stream()
                .map(consultant -> new ConsultantResponse(
                        consultant.getId(),
                        consultant.getFullName(),
                        consultant.getSpecialization(),
                        consultant.getLanguages(),
                        consultant.getRegion(),
                        consultant.getProfilePhoto(),
                        consultant.getLicenseNumber(),
                        consultant.getLocation()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(consultants);
    }

    @PostMapping("/hire")
    public ResponseEntity<String> hireRCIC(@RequestBody HireRequestDTO hireRequestDto) {
        // Find the user and RCIC
        User user = userRepository.findById(hireRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Consultant rcic = consultantRepository.findById(hireRequestDto.getRcicId())
                .orElseThrow(() -> new RuntimeException("RCIC not found"));

        // Create new Hire Request
        HireRequest hireRequest = new HireRequest();
        hireRequest.setUser(user);
        hireRequest.setRcic(rcic);
        hireRequest.setStatus("Pending");
        hireRequest.setCreatedAt(LocalDateTime.now());

        // Save to database
        hireRequestRepository.save(hireRequest);

        return ResponseEntity.ok("Hire request sent successfully!");
    }
}
