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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;  // Hashed password

    @Column(nullable = false)
    private String fullName;  // User's full name

    @Column(name = "profile_picture")
    private String profile_picture;    // Path/URL to profile photo

    private String languages;       // Spoken languages (comma-separated)
    private String region;          // Province/region
    private String location;        // Optional field for location

    private boolean enabled = false; // Email verification status

    private String verificationCode;

    private LocalDateTime codeExpiryTime; // Expiry time for the code
}
