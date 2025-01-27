package com.blift.backend.validations;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.RegisterRequest;
import com.blift.backend.dto.VerifyRequest;
import com.blift.backend.repositories.UserRepository;
import com.blift.backend.repositories.ConsultantRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AuthValidation {

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;

    public AuthValidation(UserRepository userRepository, ConsultantRepository consultantRepository) {
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
    }

    public void validateRegisterRequest(RegisterRequest request) {
        if (ValidationUtils.isBlank(request.getEmail()) || !ValidationUtils.isValidEmail(request.getEmail())) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        if (ValidationUtils.isBlank(request.getPassword()) || !ValidationUtils.isStrongPassword(request.getPassword())) {
            throw new IllegalArgumentException("Password must be at least 8 characters, contain upper and lower case letters, numbers, and symbols.");
        }
        if (ValidationUtils.isBlank(request.getFullName())) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }

        // Consultant-specific validation
        if ("CONSULTANT".equalsIgnoreCase(request.getRole())) {
            if (ValidationUtils.isBlank(request.getLicenseNumber())) {
                throw new IllegalArgumentException("Consultants must provide a license number.");
            }
            if (!ValidationUtils.isValidRCICLicense(request.getLicenseNumber())) {
                throw new IllegalArgumentException("Invalid RCIC license number format. It should be 'R' followed by 6 digits (e.g., R123456).");
            }
        }

        // Check if email is already registered
        if (userRepository.findByEmail(request.getEmail()).isPresent() ||
                consultantRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }
    }

    public void validateLoginRequest(AuthRequest request) {
        if (ValidationUtils.isBlank(request.getEmail()) || !ValidationUtils.isValidEmail(request.getEmail())) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        if (ValidationUtils.isBlank(request.getPassword())) {
            throw new IllegalArgumentException("Password cannot be empty.");
        }
    }

    public void validateEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email is required.");
        }
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format.");
        }
    }

    public void validateVerificationRequest(VerifyRequest request) {
        if (ValidationUtils.isBlank(request.getEmail()) || !ValidationUtils.isValidEmail(request.getEmail())) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        if (ValidationUtils.isBlank(request.getVerificationCode())) {
            throw new IllegalArgumentException("Verification code cannot be empty.");
        }
    }

    public void validateVerificationCode(String storedCode, String providedCode, LocalDateTime expiryTime) {
        if (!storedCode.equals(providedCode)) {
            throw new IllegalArgumentException("Invalid verification code.");
        }
        if (LocalDateTime.now().isAfter(expiryTime)) {
            throw new IllegalArgumentException("Verification code has expired.");
        }
    }
}
