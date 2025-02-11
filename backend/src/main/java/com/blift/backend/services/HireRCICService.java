package com.blift.backend.services;

import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.User;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class HireRCICService {

    private final ConsultantRepository consultantRepo;
    private final UserRepository userRepo;


    @Autowired
    public HireRCICService(ConsultantRepository consultantRepo, UserRepository userRepo){
        this.consultantRepo = consultantRepo;
        this.userRepo = userRepo;
    }


    public List<Consultant> getAgents(String language, String location) {
        return consultantRepo.findByLanguageAndLocation(language, location);
    }

    @Transactional
    public void updatePreference(User user) {
        Optional<User> updatedUserOptional = userRepo.findById(user.getId());
        if(updatedUserOptional.isEmpty()){
            throw new IllegalStateException("User not found");
        }

        User existingUser = updatedUserOptional.get();

        existingUser.setPreferredLocation(user.getPreferredLocation);

        existingUser.setPreferredLanguage(user.getPreferredLanguage);

        //user.setPreferredLocation(user.location);


    }
}
