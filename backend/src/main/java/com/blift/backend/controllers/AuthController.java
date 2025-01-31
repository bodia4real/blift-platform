package com.blift.backend.controllers;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.RegisterRequest;
import com.blift.backend.dto.VerifyRequest;
import com.blift.backend.services.AuthenticationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
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

}