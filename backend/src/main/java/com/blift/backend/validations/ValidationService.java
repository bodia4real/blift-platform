package com.blift.backend.validations;

import com.blift.backend.exceptions.ValidationException;
import com.blift.backend.repositories.UserRepository;
import com.blift.backend.repositories.ConsultantRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import java.time.LocalDateTime;

@Service
@RequestScope
public class ValidationService {

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;

    public ValidationService(UserRepository userRepository, ConsultantRepository consultantRepository) {
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
    }

    // 🔹 EMAIL VALIDATIONS
    public void checkIfEmailIsEmpty(String email) {
        if (ValidationUtils.isBlank(email)) {
            throw new ValidationException("Email cannot be empty.");
        }
    }

    public void checkIfEmailFormatIsValid(String email) {
        if (!ValidationUtils.isValidEmail(email)) {
            throw new ValidationException("Invalid email format.");
        }
    }

    public void checkIfEmailIsAlreadyRegistered(String email) {
        if (userRepository.findByEmail(email).isPresent() || consultantRepository.findByEmail(email).isPresent()) {
            throw new ValidationException("Email is already registered.");
        }
    }

    public void validateEmailForRegistration(String email) {
            checkIfEmailIsEmpty(email);
            checkIfEmailFormatIsValid(email);
            checkIfEmailIsAlreadyRegistered(email);
    }

    public void validateEmailForLogin(String email) {
        checkIfEmailIsEmpty(email);
        checkIfEmailFormatIsValid(email);
    }


    // 🔹 PASSWORD VALIDATIONS
    public void checkIfPasswordIsEmpty(String password) {
        if (ValidationUtils.isBlank(password)) {
            throw new ValidationException("Password cannot be empty.");
        }
    }

    public void checkIfPasswordIsStrong(String password) {
        if (!ValidationUtils.isStrongPassword(password)) {
            throw new ValidationException("Password must be at least 8 characters, contain upper and lower case letters, numbers, and symbols.");
        }
    }

    public void validatePassword(String password) {
        checkIfPasswordIsEmpty(password);
        checkIfPasswordIsStrong(password);
    }

    // 🔹 FULL NAME VALIDATIONS
    public void checkIfFullNameIsEmpty(String fullName) {
        if (ValidationUtils.isBlank(fullName)) {
            throw new ValidationException("Full name cannot be empty.");
        }
    }

    public void validateFullName(String fullName) {
        checkIfFullNameIsEmpty(fullName);
    }

    // 🔹 LICENSE NUMBER VALIDATIONS
    public void checkIfLicenseNumberIsEmpty(String licenseNumber) {
        if (ValidationUtils.isBlank(licenseNumber)) {
            throw new ValidationException("Consultants must provide a license number.");
        }
    }

    public void checkIfLicenseNumberIsValid(String licenseNumber) {
        if (!ValidationUtils.isValidRCICLicense(licenseNumber)) {
            throw new ValidationException("Invalid RCIC license format. It should be 'R' followed by 6 digits (e.g., R123456).");
        }
    }

    public void validateLicenseNumber(String licenseNumber) {
        checkIfLicenseNumberIsEmpty(licenseNumber);
        checkIfLicenseNumberIsValid(licenseNumber);
    }

    // 🔹 VERIFICATION CODE VALIDATIONS
    public void checkIfVerificationCodeIsInvalid(String storedCode, String providedCode) {
        if (!storedCode.equals(providedCode)) {
            throw new ValidationException("Invalid verification code.");
        }
    }

    public void checkIfVerificationCodeIsExpired(LocalDateTime expiryTime) {
        if (LocalDateTime.now().isAfter(expiryTime)) {
            throw new ValidationException("Verification code has expired.");
        }
    }

    public void validateVerificationCode(String storedCode, String providedCode, LocalDateTime expiryTime) {
        checkIfVerificationCodeIsInvalid(storedCode, providedCode);
        checkIfVerificationCodeIsExpired(expiryTime);
    }
}
