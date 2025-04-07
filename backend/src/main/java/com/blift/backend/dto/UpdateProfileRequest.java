package com.blift.backend.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String location;
    private String languages;
    private String profilePhoto;
}
