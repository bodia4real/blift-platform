package com.blift.backend.controllers;

import com.blift.backend.validations.ValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/validate")
public class ValidationController {

    private final ValidationService validationService;

    public ValidationController(ValidationService validationService) {
        this.validationService = validationService;
    }

    @GetMapping("/email")
    public ResponseEntity<?> validateEmail(@RequestParam String email) {
        validationService.validateEmail(email);
        return ResponseEntity.ok("Email is valid.");
    }

    @GetMapping("/password")
    public ResponseEntity<?> validatePassword(@RequestParam String password) {
        validationService.validatePassword(password);
        return ResponseEntity.ok("Password is valid.");
    }

    @GetMapping("/fullname")
    public ResponseEntity<?> validateFullName(@RequestParam String fullName) {
        validationService.validateFullName(fullName);
        return ResponseEntity.ok("Full name is valid.");
    }

    @GetMapping("/license")
    public ResponseEntity<?> validateLicense(@RequestParam String licenseNumber) {
        validationService.validateLicenseNumber(licenseNumber);
        return ResponseEntity.ok("License number is valid.");
    }
}
