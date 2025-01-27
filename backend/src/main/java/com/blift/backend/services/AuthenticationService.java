package com.blift.backend.services;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.RegisterRequest;
import com.blift.backend.dto.VerifyRequest;
import com.blift.backend.entities.User;
import com.blift.backend.entities.Consultant;
import com.blift.backend.repositories.UserRepository;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.validations.AuthValidation;
import com.blift.backend.validations.TokenGenerator;
import jakarta.mail.MessagingException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthValidation authValidation;
    private final EmailService emailService;

    public AuthenticationService(UserRepository userRepository,
                                 ConsultantRepository consultantRepository,
                                 PasswordEncoder passwordEncoder,
                                 AuthValidation authValidation, EmailService emailService) {
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
        this.passwordEncoder = passwordEncoder;
        this.authValidation = authValidation;
        this.emailService = emailService;
    }

    public String register(RegisterRequest request) throws MessagingException {
        // Delegate validation to AuthValidation
        authValidation.validateRegisterRequest(request);

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
            );

            return "Consultant registered successfully. Please verify your email.";
        } else {
            throw new IllegalArgumentException("Invalid role.");
        }
    }

    public String login(AuthRequest request) {
        // Delegate validation to AuthValidation
        authValidation.validateLoginRequest(request);

        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new IllegalArgumentException("Invalid email or password.");
            }
            if (!user.isEnabled()) {
                throw new IllegalArgumentException("Account not verified. Please verify your email.");
            }
            return "User logged in successfully!";
        }

        var consultantOpt = consultantRepository.findByEmail(request.getEmail());
        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), consultant.getPassword())) {
                throw new IllegalArgumentException("Invalid email or password.");
            }
            if (!consultant.isEnabled()) {
                throw new IllegalArgumentException("Account not verified. Please verify your email.");
            }
            return "Consultant logged in successfully!";
        }

        throw new IllegalArgumentException("Email not found. Please register.");
    }

    public String verify(VerifyRequest request) {
        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!user.getVerificationCode().equals(request.getVerificationCode()) ||
                    user.getCodeExpiryTime().isBefore(LocalDateTime.now())) {
                throw new IllegalArgumentException("Invalid or expired verification code.");
            }
            user.setEnabled(true);
            user.setVerificationCode(null);
            user.setCodeExpiryTime(null);
            userRepository.save(user);
            return "User email verified successfully.";
        }

        var consultantOpt = consultantRepository.findByEmail(request.getEmail());
        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            if (!consultant.getVerificationCode().equals(request.getVerificationCode()) ||
                    consultant.getCodeExpiryTime().isBefore(LocalDateTime.now())) {
                throw new IllegalArgumentException("Invalid or expired verification code.");
            }
            consultant.setEnabled(true);
            consultant.setVerificationCode(null);
            consultant.setCodeExpiryTime(null);
            consultantRepository.save(consultant);
            return "Consultant email verified successfully.";
        }

        throw new IllegalArgumentException("Email not found.");
    }
}
