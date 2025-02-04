package com.blift.backend.dto;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
    private String verificationCode;
    private String newPassword;
    private String confirmPassword;

    public void validatePasswordMatch() {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match.");
        }
    }
}
