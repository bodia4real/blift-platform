package com.blift.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileResponseDTO {
    private String fullName;
    private String role; // "User"
    private String location;
    private String region;
    private String languages;
    private String profilePicturePath;
}
