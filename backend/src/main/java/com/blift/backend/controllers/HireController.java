package com.blift.backend.controllers;

import com.blift.backend.dto.ConsultantResponse;
import com.blift.backend.dto.HireRequestDTO;
import com.blift.backend.dto.HireRequestResponseDTO;
import com.blift.backend.dto.UserHireRequestResponseDTO;
import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.HireRequest;
import com.blift.backend.entities.HiredRCIC;
import com.blift.backend.entities.User;
import com.blift.backend.exceptions.ValidationException;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.HireRequestRepository;
import com.blift.backend.repositories.HiredRCICRepository;
import com.blift.backend.repositories.UserRepository;
import com.blift.backend.validations.HireValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.Arrays;
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

    @Autowired
    private HireValidation hireValidation;

    @PostMapping("/hire")
    public ResponseEntity<String> hireRCIC(@RequestBody HireRequestDTO hireRequestDto) {
        User user = hireValidation.validateUserExists(hireRequestDto.getUserId());
        Consultant rcic = hireValidation.validateRCICExists(hireRequestDto.getRcicId());
        hireValidation.checkDuplicateRequest(user.getId(), rcic.getId());

        HireRequest hireRequest = new HireRequest();
        hireRequest.setUser(user);
        hireRequest.setRcic(rcic);
        hireRequest.setStatus("Pending");
        hireRequest.setCreatedAt(LocalDateTime.now());

        hireRequestRepository.save(hireRequest);
        return ResponseEntity.ok("Hire request sent successfully!");
    }

    @PutMapping("/hire/{id}/accept")
    public ResponseEntity<String> acceptHireRequest(@PathVariable Long id) {
        HireRequest request = hireRequestRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Hire request not found."));

        hireValidation.ensureRequestIsPending(request); // ✅ Check if already accepted or declined

        request.setStatus("Accepted");
        hireRequestRepository.save(request);

        HiredRCIC hiredRCIC = new HiredRCIC();
        hiredRCIC.setUser(request.getUser());
        hiredRCIC.setRcic(request.getRcic());
        hiredRCIC.setCreatedAt(LocalDateTime.now());
        hiredRCICRepository.save(hiredRCIC);

        return ResponseEntity.ok("Hire request accepted and match stored.");
    }

    @PutMapping("/hire/{id}/decline")
    public ResponseEntity<String> declineHireRequest(@PathVariable Long id) {
        HireRequest request = hireRequestRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Hire request not found."));

        hireValidation.ensureRequestIsPending(request); // ✅ Check if already accepted or declined

        request.setStatus("Declined");
        hireRequestRepository.save(request);

        return ResponseEntity.ok("Hire request declined.");
    }

    @GetMapping("/hire-requests/{consultantId}")
    public ResponseEntity<List<HireRequestResponseDTO>> getHireRequestsForRCIC(@PathVariable Long consultantId) {
        Consultant rcic = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new ValidationException("Consultant not found."));

        List<HireRequest> requests = hireRequestRepository.findByRcicId(rcic.getId());

        List<HireRequestResponseDTO> response = requests.stream()
                .map(req -> new HireRequestResponseDTO(
                        req.getId(),
                        req.getUser().getId(),
                        req.getUser().getFullName(),
                        req.getUser().getLocation(),
                        req.getUser().getRegion(),
                        Arrays.stream(req.getUser().getLanguages().split(","))
                                .map(String::trim)
                                .collect(Collectors.toList()),
                        req.getStatus(),
                        req.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }


    @GetMapping("/hire-requests/user/{userId}")
    public ResponseEntity<List<UserHireRequestResponseDTO>> getHireRequestsByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ValidationException("User not found."));

        List<HireRequest> requests = hireRequestRepository.findByUserId(user.getId());

        List<UserHireRequestResponseDTO> response = requests.stream()
                .map(req -> new UserHireRequestResponseDTO(
                        req.getId(),
                        req.getRcic().getId(),
                        req.getRcic().getFullName(),
                        req.getStatus(),
                        req.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

}
