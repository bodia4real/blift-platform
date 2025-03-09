package com.blift.backend.services;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.PasswordResetRequest;
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
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final PasswordEncoder passwordEncoder;
    private final ValidationService validationService;
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

    public String register(RegisterRequest request) {

        if ("CONSULTANT".equalsIgnoreCase(request.getRole())) {
            validationService.validateLicenseNumber(request.getLicenseNumber());
        }

        if ("USER".equalsIgnoreCase(request.getRole())) {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFullName(request.getFullName());
            user.setEnabled(false); // User is unverified but can log in
            userRepository.save(user);
            return "User registered successfully. You can log in, and verify your email later if you want.";
        } else if ("CONSULTANT".equalsIgnoreCase(request.getRole())) {
            Consultant consultant = new Consultant();
            consultant.setEmail(request.getEmail());
            consultant.setPassword(passwordEncoder.encode(request.getPassword()));
            consultant.setFullName(request.getFullName());
            consultant.setLicenseNumber(request.getLicenseNumber());
            consultant.setEnabled(false); // Consultant is unverified but can log in
            consultantRepository.save(consultant);
            return "Consultant registered successfully. You can log in, and verify your email later if you want.";
        } else {
            throw new ValidationException("Invalid role.");
        }
    }

    public String login(AuthRequest request) {

        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new ValidationException("Invalid email or password.");
            }
            return "User logged in successfully!"; // ✅ No need to verify email
        }

        var consultantOpt = consultantRepository.findByEmail(request.getEmail());
        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), consultant.getPassword())) {
                throw new ValidationException("Invalid email or password.");
            }
            return "Consultant logged in successfully!"; // ✅ No need to verify email
        }

        throw new ValidationException("Email not found. Please register.");
    }

    public String requestVerificationCode(String email) throws MessagingException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        Optional<Consultant> consultantOpt = consultantRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String verificationCode = TokenGenerator.generateVerificationCode();
            user.setVerificationCode(verificationCode);
            user.setCodeExpiryTime(TokenGenerator.generateExpiryTime());
            userRepository.save(user);

            emailService.sendEmail(
                    user.getEmail(),
                    "Verify Your Email",
                    "Your verification code is: " + verificationCode
            );

            return "Verification code sent to your email.";
        }

        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            String verificationCode = TokenGenerator.generateVerificationCode();
            consultant.setVerificationCode(verificationCode);
            consultant.setCodeExpiryTime(TokenGenerator.generateExpiryTime());
            consultantRepository.save(consultant);

            emailService.sendEmail(
                    consultant.getEmail(),
                    "Verify Your Email",
                    "Your verification code is: " + verificationCode
            );

            return "Verification code sent to your email.";
        }

        throw new ValidationException("Email not found.");
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

    public String requestPasswordReset(String email) throws MessagingException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        Optional<Consultant> consultantOpt = consultantRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String verificationCode = TokenGenerator.generateVerificationCode();
            user.setVerificationCode(verificationCode);
            user.setCodeExpiryTime(TokenGenerator.generateExpiryTime());
            userRepository.save(user);

            emailService.sendEmail(
                    user.getEmail(),
                    "Reset Your Password",
                    "Your password reset code is: " + verificationCode
            );

            return "Password reset code sent to your email.";
        }

        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            String verificationCode = TokenGenerator.generateVerificationCode();
            consultant.setVerificationCode(verificationCode);
            consultant.setCodeExpiryTime(TokenGenerator.generateExpiryTime());
            consultantRepository.save(consultant);

            emailService.sendEmail(
                    consultant.getEmail(),
                    "Reset Your Password",
                    "Your password reset code is: " + verificationCode
            );

            return "Password reset code sent to your email.";
        }

        throw new ValidationException("Email not found.");
    }

    // ✅ Step 2: Reset password (verify code and update password)
    public String resetPassword(PasswordResetRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        Optional<Consultant> consultantOpt = consultantRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            validationService.validateVerificationCode(user.getVerificationCode(), request.getVerificationCode(), user.getCodeExpiryTime());
            validationService.validatePassword(request.getNewPassword());

            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            user.setVerificationCode(null);
            user.setCodeExpiryTime(null);
            userRepository.save(user);

            return "Password reset successfully.";
        }

        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            validationService.validateVerificationCode(consultant.getVerificationCode(), request.getVerificationCode(), consultant.getCodeExpiryTime());
            validationService.validatePassword(request.getNewPassword());

            consultant.setPassword(passwordEncoder.encode(request.getNewPassword()));
            consultant.setVerificationCode(null);
            consultant.setCodeExpiryTime(null);
            consultantRepository.save(consultant);

            return "Password reset successfully.";
        }

        throw new ValidationException("Invalid email.");
    }
}
