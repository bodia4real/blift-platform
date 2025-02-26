package com.blift.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "consultants")
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    private String specialization;  // Optional field for specialization
    private String languages;       // Spoken languages (comma-separated)
    private String region;          // Province/region
    private String profilePhoto;    // Path/URL to profile photo

    @Column(unique = true, nullable = false)
    private String licenseNumber;   // License number (must be unique)

    private String location;        // Optional field for location

    private boolean enabled = false; // Email verification status
    private String verificationCode;
    private LocalDateTime codeExpiryTime; // Expiry time for the code
}
