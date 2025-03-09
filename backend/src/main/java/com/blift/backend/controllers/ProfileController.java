package com.blift.backend.controllers;

import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.User;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConsultantRepository consultantRepository;

    // Update user profile
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> existingUser = userRepository.findById(id);

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            // Debugging prints
            System.out.println("Received Languages: " + updatedUser.getLanguages());
            System.out.println("Received Region: " + updatedUser.getRegion());
            System.out.println("Received Profile Picture: " + updatedUser.getProfile_picture());

            user.setLanguages(updatedUser.getLanguages());
            user.setRegion(updatedUser.getRegion());
            user.setProfile_picture(updatedUser.getProfile_picture());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // Update consultant profile
    @PutMapping("/consultant/{id}")
    public ResponseEntity<?> updateConsultantProfile(@PathVariable Long id, @RequestBody Consultant updatedConsultant) {
        Optional<Consultant> existingConsultant = consultantRepository.findById(id);

        if (existingConsultant.isPresent()) {
            Consultant consultant = existingConsultant.get();
            consultant.setLanguages(updatedConsultant.getLanguages());
            consultant.setRegion(updatedConsultant.getRegion());
            consultant.setProfilePhoto(updatedConsultant.getProfilePhoto());
            consultantRepository.save(consultant);
            return ResponseEntity.ok(consultant);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consultant not found");
    }

    // Upload profile photo
    @PostMapping("/upload/{userType}/{id}")
    public ResponseEntity<?> uploadProfilePhoto(@PathVariable String userType, @PathVariable Long id,
                                                @RequestParam("file") MultipartFile file) {
        String uploadDir = "uploads/";
        String fileName = file.getOriginalFilename();

        try {
            // Save the file to the local file system
            File targetFile = new File(uploadDir + fileName);
            file.transferTo(targetFile);

            // Update profile photo in database
            if ("user".equalsIgnoreCase(userType)) {
                Optional<User> user = userRepository.findById(id);
                if (user.isPresent()) {
                    user.get().setProfile_picture(uploadDir + fileName);
                    userRepository.save(user.get());
                    return ResponseEntity.ok("Profile photo updated for user.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                }
            } else if ("consultant".equalsIgnoreCase(userType)) {
                Optional<Consultant> consultant = consultantRepository.findById(id);
                if (consultant.isPresent()) {
                    consultant.get().setProfilePhoto(uploadDir + fileName);
                    consultantRepository.save(consultant.get());
                    return ResponseEntity.ok("Profile photo updated for consultant.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consultant not found");
                }
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid userType");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }
}
