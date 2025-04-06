package com.blift.backend.validations;

import com.blift.backend.entities.CaseType;
import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.User;
import com.blift.backend.exceptions.ValidationException;
import com.blift.backend.repositories.CaseTypeRepository;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CaseValidation {

    private final UserRepository userRepository;
    private final CaseTypeRepository caseTypeRepository;
    private final ConsultantRepository consultantRepository;

    public CaseValidation(UserRepository userRepository,
                          CaseTypeRepository caseTypeRepository,
                          ConsultantRepository consultantRepository) {
        this.userRepository = userRepository;
        this.caseTypeRepository = caseTypeRepository;
        this.consultantRepository = consultantRepository;
    }

    public User validateUserExists(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ValidationException("User not found."));
    }

    public CaseType validateCaseTypeExists(Long caseTypeId) {
        return caseTypeRepository.findById(caseTypeId)
                .orElseThrow(() -> new ValidationException("Case type not found."));
    }

    public Consultant validateRCICExists(Long rcicId) {
        return consultantRepository.findById(rcicId)
                .orElseThrow(() -> new ValidationException("RCIC not found."));
    }
}
