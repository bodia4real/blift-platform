package com.blift.backend.controllers;

import com.blift.backend.dto.ConsultantResponse;
import com.blift.backend.entities.Consultant;
import com.blift.backend.repositories.ConsultantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rcics")
public class HireController {

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
}
