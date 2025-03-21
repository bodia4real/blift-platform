package com.blift.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HireRequestDTO {
    private Long userId;  // The applicant/user hiring an RCIC
    private Long rcicId;  // The RCIC being hired
}
