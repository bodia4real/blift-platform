package com.blift.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConsultantResponse {
    private Long id;
    private String fullName;
    private String specialization;
    private String languages;
    private String region;
    private String profilePhoto;
    private String licenseNumber;
    private String location;

    public ConsultantResponse(Long id, String fullName, String specialization, String languages, String region, String profilePhoto, String licenseNumber, String location) {
        this.id = id;
        this.fullName = fullName;
        this.specialization = specialization;
        this.languages = languages;
        this.region = region;
        this.profilePhoto = profilePhoto;
        this.licenseNumber = licenseNumber;
        this.location = location;
    }
}
