package com.blift.backend.controllers;

import com.blift.backend.dto.CaseResponseDTO;
import com.blift.backend.dto.CreateCaseRequest;
import com.blift.backend.entities.Case;
import com.blift.backend.entities.CaseType;
import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.User;
import com.blift.backend.repositories.CaseRepository;
import com.blift.backend.repositories.CaseTypeRepository;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cases")
public class CaseController {

    private final CaseRepository caseRepository;
    private final CaseTypeRepository caseTypeRepository;
    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;

    public CaseController(CaseRepository caseRepository,
                          CaseTypeRepository caseTypeRepository,
                          UserRepository userRepository,
                          ConsultantRepository consultantRepository) {
        this.caseRepository = caseRepository;
        this.caseTypeRepository = caseTypeRepository;
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
    }

    @PostMapping
    public ResponseEntity<String> createCase(@RequestBody CreateCaseRequest request) {
        // Find user
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find case type
        CaseType caseType = caseTypeRepository.findById(request.getCaseTypeId())
                .orElseThrow(() -> new RuntimeException("Case type not found"));

        // Find RCIC
        Consultant rcic = consultantRepository.findById(request.getRcicId())
                .orElseThrow(() -> new RuntimeException("RCIC not found"));

        // Auto-generate case name
        String generatedName = caseType.getCaseTypeName() + " for " + user.getFullName();

        // Create and save new case
        Case newCase = new Case();
        newCase.setName(generatedName);
        newCase.setProvince(request.getProvince());
        newCase.setStatus(request.getStatus());
        newCase.setCaseType(caseType);
        newCase.setUser(user);
        newCase.setRcic(rcic);

        caseRepository.save(newCase);

        return ResponseEntity.ok("Case created successfully for " + user.getFullName());
    }

    @GetMapping("/rcic/{rcicId}")
    public ResponseEntity<List<CaseResponseDTO>> getCasesByRcic(@PathVariable Long rcicId) {
        List<CaseResponseDTO> result = caseRepository.findByRcicId(rcicId)
                .stream()
                .map(this::mapToDto)
                .toList();

        return ResponseEntity.ok(result);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CaseResponseDTO>> getCasesByUser(@PathVariable Long userId) {
        List<CaseResponseDTO> result = caseRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDto)
                .toList();

        return ResponseEntity.ok(result);
    }

    private CaseResponseDTO mapToDto(Case c) {
        return new CaseResponseDTO(
                c.getId(),
                c.getName(),
                c.getProvince(),
                c.getStatus(),
                c.getDate(),
                c.getCaseType().getCaseTypeName(),
                c.getUser().getId(),
                c.getUser().getFullName(),
                c.getRcic().getId(),
                c.getRcic().getFullName()
        );
    }

}
