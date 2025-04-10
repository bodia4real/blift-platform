package com.blift.backend.controllers;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.PasswordResetRequest;
import com.blift.backend.dto.RegisterRequest;
import com.blift.backend.dto.VerifyRequest;
import com.blift.backend.services.AuthenticationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String message = authenticationService.register(request);
        return ResponseEntity.ok(message);
    }

    @PostMapping
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        String message = authenticationService.login(request);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/request-verification")
    public ResponseEntity<String> requestVerificationCode(@RequestParam String email) throws MessagingException {
        String message = authenticationService.requestVerificationCode(email);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody VerifyRequest request) {
        String result = authenticationService.verify(request);
        return ResponseEntity.ok(result); // Wrap the response in a ResponseEntity
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) throws MessagingException {
        String message = authenticationService.requestPasswordReset(email);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest request) {
        request.validatePasswordMatch(); // Check if passwords match
        String message = authenticationService.resetPassword(request);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(@RequestParam String email) {
        var userInfo = authenticationService.getUserInfoByEmail(email);
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        return ResponseEntity.ok(userInfo);
    }


}