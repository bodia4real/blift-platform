package com.blift.backend.services;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.RegisterRequest;
import com.blift.backend.entities.User;
import com.blift.backend.entities.Consultant;
import com.blift.backend.repositories.UserRepository;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.validations.AuthValidation;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthValidation authValidation;  // Inject validation class

    public AuthenticationService(UserRepository userRepository,
                                 ConsultantRepository consultantRepository,
                                 PasswordEncoder passwordEncoder,
                                 AuthValidation authValidation) {
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
        this.passwordEncoder = passwordEncoder;
        this.authValidation = authValidation;
    }

    // Registration logic
    public String register(RegisterRequest request) {
        // Delegate validation to the AuthValidation class
        authValidation.validateRegisterRequest(request);

        if (request.getRole().equalsIgnoreCase("USER")) {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email already registered as User.");
            }
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFullName(request.getFullName());
            userRepository.save(user);
            return "User registered successfully.";
        } else if (request.getRole().equalsIgnoreCase("CONSULTANT")) {
            if (consultantRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email already registered as Consultant.");
            }
            Consultant consultant = new Consultant();
            consultant.setEmail(request.getEmail());
            consultant.setPassword(passwordEncoder.encode(request.getPassword()));
            consultant.setFullName(request.getFullName());
            consultant.setLicenseNumber(request.getLicenseNumber());  // Ensure license number is set
            consultantRepository.save(consultant);
            return "Consultant registered successfully.";
        } else {
            throw new IllegalArgumentException("Invalid role.");
        }
    }

    // Login logic
    public String login(AuthRequest request) {
        // Delegate validation to the AuthValidation class
        authValidation.validateLoginRequest(request);

        // Check if the email belongs to a USER
        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new IllegalArgumentException("Invalid email or password.");
            }
            return "User logged in successfully!";
        }

        // Check if the email belongs to a CONSULTANT
        var consultantOpt = consultantRepository.findByEmail(request.getEmail());
        if (consultantOpt.isPresent()) {
            Consultant consultant = consultantOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), consultant.getPassword())) {
                throw new IllegalArgumentException("Invalid email or password.");
            }
            return "Consultant logged in successfully!";
        }

        throw new IllegalArgumentException("Email not found. Please register.");
    }
}
