package com.blift.backend.controllers;

import com.blift.backend.dto.AuthRequest;
import com.blift.backend.dto.RegisterRequest;
import com.blift.backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
