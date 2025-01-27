package com.blift.backend.dto;

import lombok.Data;

@Data
public class VerifyRequest {
    private String email;
    private String verificationCode;
}
