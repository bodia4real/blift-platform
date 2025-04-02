package com.blift.backend.controllers;

import com.blift.backend.dto.ConsultantResponse;
import com.blift.backend.dto.HireRequestDTO;
import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.HireRequest;
import com.blift.backend.entities.HiredRCIC;
import com.blift.backend.entities.User;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.HireRequestRepository;
import com.blift.backend.repositories.HiredRCICRepository;
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
    private HiredRCICRepository hiredRCICRepository;

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

    // ✅ ACCEPT HIRE REQUEST & STORE IN hired_rcics
    @PutMapping("/hire/{id}/accept")
    public ResponseEntity<String> acceptHireRequest(@PathVariable Long id) {
        // Find the hire request
        HireRequest request = hireRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hire request not found"));


        // Update request status to ACCEPTED
        request.setStatus("Accepted");
        hireRequestRepository.save(request);

        // Store the match in hired_rcics
        HiredRCIC hiredRCIC = new HiredRCIC();
        hiredRCIC.setUser(request.getUser());
        hiredRCIC.setRcic(request.getRcic());
        hiredRCIC.setCreatedAt(LocalDateTime.now());
        hiredRCICRepository.save(hiredRCIC);

        return ResponseEntity.ok("Hire request accepted and match stored in hired_rcics!");
    }

    // ✅ DECLINE HIRE REQUEST (NO MATCH CREATED)
    @PutMapping("/hire/{id}/decline")
    public ResponseEntity<String> declineHireRequest(@PathVariable Long id) {
        // Find hire request
        HireRequest request = hireRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hire request not found"));


        // Update request status to DECLINED
        request.setStatus("Declined");
        hireRequestRepository.save(request);

        return ResponseEntity.ok("Hire request declined.");
    }
}
