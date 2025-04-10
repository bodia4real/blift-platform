package com.blift.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class HireRequestResponseDTO {
    private final Long requestId;
    private final Long userId;
    private final String userFullName;
    private final String location;
    private final String region;
    private final List<String> languages;
    private final String status;
    private final LocalDateTime createdAt;

    public HireRequestResponseDTO(
            Long requestId,
            Long userId,
            String userFullName,
            String location,
            String region,
            List<String> languages,
            String status,
            LocalDateTime createdAt) {
        this.requestId = requestId;
        this.userId = userId;
        this.userFullName = userFullName;
        this.location = location;
        this.region = region;
        this.languages = languages;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getRequestId() {
        return requestId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserFullName() {
        return userFullName;
    }

    public String getLocation() {
        return location;
    }

    public String getRegion() {
        return region;
    }

    public List<String> getLanguages() {
        return languages;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
