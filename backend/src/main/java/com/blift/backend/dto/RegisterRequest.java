package com.blift.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String fullName;
    private String role;  // "USER" or "CONSULTANT"
    private String licenseNumber;
}
