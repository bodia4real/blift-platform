package com.blift.backend.validations;

import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.HireRequest;
import com.blift.backend.entities.User;
import com.blift.backend.exceptions.ValidationException;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.HireRequestRepository;
import com.blift.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class HireValidation {

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final HireRequestRepository hireRequestRepository;

    public HireValidation(UserRepository userRepository, ConsultantRepository consultantRepository, HireRequestRepository hireRequestRepository) {
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
        this.hireRequestRepository = hireRequestRepository;
    }

    public User validateUserExists(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ValidationException("User not found."));
    }

    public Consultant validateRCICExists(Long rcicId) {
        return consultantRepository.findById(rcicId)
                .orElseThrow(() -> new ValidationException("RCIC not found."));
    }

    public void checkDuplicateRequest(Long userId, Long rcicId) {
        boolean exists = hireRequestRepository.existsByUserIdAndRcicIdAndStatus(userId, rcicId, "Pending");
        if (exists) {
            throw new ValidationException("A pending hire request already exists.");
        }
    }

    public void ensureRequestIsPending(HireRequest request) {
        if (!"Pending".equalsIgnoreCase(request.getStatus())) {
            throw new ValidationException("This request was already " + request.getStatus().toLowerCase() + ".");
        }
    }
}
