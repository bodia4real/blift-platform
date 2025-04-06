package com.blift.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCaseRequest {
    private Long userId;
    private Long caseTypeId;
    private Long rcicId;         // NEW: Who is creating the case
    private String province;
}