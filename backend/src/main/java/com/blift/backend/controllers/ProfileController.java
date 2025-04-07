package com.blift.backend.controllers;

import com.blift.backend.dto.ConsultantProfileResponseDTO;
import com.blift.backend.dto.UserProfileResponseDTO;
import com.blift.backend.entities.Consultant;
import com.blift.backend.entities.User;
import com.blift.backend.repositories.ConsultantRepository;
import com.blift.backend.repositories.UserRepository;
import com.blift.backend.validations.ProfileValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private ProfileValidation profileValidation;

    @GetMapping("/user/{id}")
    public ResponseEntity<UserProfileResponseDTO> getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    UserProfileResponseDTO dto = new UserProfileResponseDTO(
                            user.getFullName(),
                            "User",
                            user.getLocation(),
                            user.getRegion(),
                            user.getLanguages(),
                            user.getProfile_picture()
                    );
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }


    @GetMapping("/consultant/{id}")
    public ResponseEntity<ConsultantProfileResponseDTO> getConsultantProfile(@PathVariable Long id) {
        return consultantRepository.findById(id)
                .map(consultant -> {
                    ConsultantProfileResponseDTO dto = new ConsultantProfileResponseDTO(
                            consultant.getFullName(),
                            "Consultant",
                            consultant.getLocation(),
                            consultant.getRegion(),
                            consultant.getLanguages(),
                            consultant.getProfilePhoto(),
                            consultant.getSpecialization()
                    );
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }


    @PutMapping("/user/{id}")
    public ResponseEntity<UserProfileResponseDTO> updateUserProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = profileValidation.validateUserExists(id);

        user.setFullName(updatedUser.getFullName());
        user.setLanguages(updatedUser.getLanguages());
        user.setRegion(updatedUser.getRegion());
        user.setLocation(updatedUser.getLocation());
        user.setProfile_picture(updatedUser.getProfile_picture());

        userRepository.save(user);

        UserProfileResponseDTO dto = new UserProfileResponseDTO(
                user.getFullName(),
                "User",
                user.getLocation(),
                user.getRegion(),
                user.getLanguages(),
                user.getProfile_picture()
        );

        return ResponseEntity.ok(dto);
    }


    @PutMapping("/consultant/{id}")
    public ResponseEntity<ConsultantProfileResponseDTO> updateConsultantProfile(@PathVariable Long id, @RequestBody Consultant updated) {
        Consultant c = profileValidation.validateConsultantExists(id);

        c.setFullName(updated.getFullName());
        c.setLanguages(updated.getLanguages());
        c.setRegion(updated.getRegion());
        c.setLocation(updated.getLocation());
        c.setProfilePhoto(updated.getProfilePhoto());
        c.setSpecialization(updated.getSpecialization());

        consultantRepository.save(c);

        ConsultantProfileResponseDTO dto = new ConsultantProfileResponseDTO(
                c.getFullName(),
                "Consultant",
                c.getLocation(),
                c.getRegion(),
                c.getLanguages(),
                c.getProfilePhoto(),
                c.getSpecialization()
        );

        return ResponseEntity.ok(dto);
    }

    @PostMapping("/upload/{userType}/{id}")
    public ResponseEntity<?> uploadProfilePhoto(@PathVariable String userType,
                                                @PathVariable Long id,
                                                @RequestParam("file") MultipartFile file) {
        String uploadDir = "uploads/";
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists() && !uploadDirFile.mkdirs()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create upload directory.");
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File destination = new File(uploadDir + fileName);

        try {
            file.transferTo(destination);
            String filePath = uploadDir + fileName;

            if ("user".equalsIgnoreCase(userType)) {
                User user = profileValidation.validateUserExists(id);
                user.setProfile_picture(filePath);
                userRepository.save(user);
                return ResponseEntity.ok().body(filePath);
            }

            if ("consultant".equalsIgnoreCase(userType)) {
                Consultant consultant = profileValidation.validateConsultantExists(id);
                consultant.setProfilePhoto(filePath);
                consultantRepository.save(consultant);
                return ResponseEntity.ok().body(filePath);
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user type.");
        } catch (IOException e) {
        e.printStackTrace(); // log to console
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Upload failed: " + e.getMessage());
    }

}
}
