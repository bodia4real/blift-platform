package com.blift.backend.dto;

import java.time.LocalDateTime;

public class UserHireRequestResponseDTO {
    private final Long requestId;
    private final Long rcicId;
    private final String rcicFullName;
    private final String status;
    private final LocalDateTime createdAt;

    public UserHireRequestResponseDTO(Long requestId, Long rcicId, String rcicFullName, String status, LocalDateTime createdAt) {
        this.requestId = requestId;
        this.rcicId = rcicId;
        this.rcicFullName = rcicFullName;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getRequestId() {
        return requestId;
    }

    public Long getRcicId() {
        return rcicId;
    }

    public String getRcicFullName() {
        return rcicFullName;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
