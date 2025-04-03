package com.blift.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CaseResponseDTO {
    private Long id;
    private String name;
    private String province;
    private String status;
    private LocalDateTime date;

    private String caseTypeName;
    private Long userId;
    private String userName;
    private Long rcicId;
    private String rcicName;
}
