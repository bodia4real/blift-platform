package com.blift.backend.controllers;

import com.blift.backend.dto.CaseResponseDTO;
import com.blift.backend.dto.CreateCaseRequest;
import com.blift.backend.entities.Case;
import com.blift.backend.entities.CaseType;
import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.User;
import com.blift.backend.repositories.CaseRepository;
import com.blift.backend.validations.CaseValidation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cases")
public class CaseController {

    private final CaseRepository caseRepository;
    private final CaseValidation caseValidation;

    public CaseController(CaseRepository caseRepository,
                          CaseValidation caseValidation) {
        this.caseRepository = caseRepository;
        this.caseValidation = caseValidation;
    }

    @PostMapping
    public ResponseEntity<String> createCase(@RequestBody CreateCaseRequest request) {
        User user = caseValidation.validateUserExists(request.getUserId());
        CaseType caseType = caseValidation.validateCaseTypeExists(request.getCaseTypeId());
        Consultant rcic = caseValidation.validateRCICExists(request.getRcicId());

        String generatedName = caseType.getCaseTypeName() + " for " + user.getFullName();

        Case newCase = new Case();
        newCase.setName(generatedName);
        newCase.setProvince(request.getProvince());
        newCase.setStatus("Active"); // ✅ default status
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
