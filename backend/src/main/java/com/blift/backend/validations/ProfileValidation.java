package com.blift.backend.validations;

import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.User;
import com.blift.backend.exceptions.ValidationException;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileValidation {

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;

    public ProfileValidation(UserRepository userRepository, ConsultantRepository consultantRepository) {
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
    }

    public User validateUserExists(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ValidationException("User not found."));
    }

    public Consultant validateConsultantExists(Long consultantId) {
        return consultantRepository.findById(consultantId)
                .orElseThrow(() -> new ValidationException("Consultant not found."));
    }
}
