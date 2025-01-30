package com.blift.backend.services;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.RegisterRequest;
import com.blift.backend.dto.VerifyRequest;
import com.blift.backend.entities.User;
import com.blift.backend.entities.Consultant;
import com.blift.backend.repositories.UserRepository;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.validations.TokenGenerator;
import com.blift.backend.validations.ValidationService;
import com.blift.backend.exceptions.ValidationException;
import jakarta.mail.MessagingException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final PasswordEncoder passwordEncoder;
    private final ValidationService validationService; // NEW validation service
    private final EmailService emailService;

    public AuthenticationService(UserRepository userRepository,
                                 ConsultantRepository consultantRepository,
                                 PasswordEncoder passwordEncoder,
                                 ValidationService validationService,
                                 EmailService emailService) {
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
        this.passwordEncoder = passwordEncoder;
        this.validationService = validationService;
        this.emailService = emailService;
    }

    public String register(RegisterRequest request) throws MessagingException {
        // ✅ Use ValidationService to validate input fields
//        validationService.validateEmail(request.getEmail());
//        validationService.validatePassword(request.getPassword());
//        validationService.validateFullName(request.getFullName());

        if ("CONSULTANT".equalsIgnoreCase(request.getRole())) {
            validationService.validateLicenseNumber(request.getLicenseNumber());
        }

        if ("USER".equalsIgnoreCase(request.getRole())) {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFullName(request.getFullName());
            user.setVerificationCode(TokenGenerator.generateVerificationCode());
            user.setCodeExpiryTime(TokenGenerator.generateExpiryTime());
            userRepository.save(user);

            // Send verification email
            emailService.sendEmail(
                    user.getEmail(),
                    "Verify Your Email",
                    "Your verification code is: " + user.getVerificationCode()
            );

            return "User registered successfully. Please verify your email.";
        } else if ("CONSULTANT".equalsIgnoreCase(request.getRole())) {
            Consultant consultant = new Consultant();
            consultant.setEmail(request.getEmail());
            consultant.setPassword(passwordEncoder.encode(request.getPassword()));
            consultant.setFullName(request.getFullName());
            consultant.setLicenseNumber(request.getLicenseNumber());
            consultant.setVerificationCode(TokenGenerator.generateVerificationCode());
            consultant.setCodeExpiryTime(TokenGenerator.generateExpiryTime());
            consultantRepository.save(consultant);

            // Send verification email
            emailService.sendEmail(
                    consultant.getEmail(),
                    "Verify Your Email",
                    "Your verification code is: " + consultant.getVerificationCode()
            );return "Consultant registered successfully. Please verify your email.";
        } else {
            throw new ValidationException("Invalid role.");
        }
    }
    public String login(AuthRequest request) {
        // ✅ Use ValidationService to validate login request
//        validationService.validateEmail(request.getEmail());
//        validationService.validatePassword(request.getPassword());

        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new ValidationException("Invalid email or password.");
            }
            if (!user.isEnabled()) {
                throw new ValidationException("Account not verified. Please verify your email.");
            }
            return "User logged in successfully!";
        }

        var consultantOpt = consultantRepository.findByEmail(request.getEmail());
        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), consultant.getPassword())) {
                throw new ValidationException("Invalid email or password.");
            }
            if (!consultant.isEnabled()) {
                throw new ValidationException("Account not verified. Please verify your email.");
            }
            return "Consultant logged in successfully!";
        }

        throw new ValidationException("Email not found. Please register.");
    }

    public String verify(VerifyRequest request) {
        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            validationService.validateVerificationCode(user.getVerificationCode(), request.getVerificationCode(), user.getCodeExpiryTime());

            user.setEnabled(true);
            user.setVerificationCode(null);
            user.setCodeExpiryTime(null);
            userRepository.save(user);
            return "User email verified successfully.";
        }

        var consultantOpt = consultantRepository.findByEmail(request.getEmail());
        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            validationService.validateVerificationCode(consultant.getVerificationCode(), request.getVerificationCode(), consultant.getCodeExpiryTime());

            consultant.setEnabled(true);
            consultant.setVerificationCode(null);
            consultant.setCodeExpiryTime(null);
            consultantRepository.save(consultant);
            return "Consultant email verified successfully.";
        }

        throw new ValidationException("Email not found.");
    }
}