package com.blift.backend.validations;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.RegisterRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthValidation {

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
    }

    public void validateLoginRequest(AuthRequest request) {
        if (ValidationUtils.isBlank(request.getEmail()) || !ValidationUtils.isValidEmail(request.getEmail())) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        if (ValidationUtils.isBlank(request.getPassword())) {
            throw new IllegalArgumentException("Password cannot be empty.");
        }
    }
}
