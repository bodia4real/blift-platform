package com.blift.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConsultantProfileResponseDTO {
    private String fullName;
    private String role; // "Consultant"
    private String location;
    private String region;
    private String languages;
    private String profilePicturePath;
    private String specialization;
}
