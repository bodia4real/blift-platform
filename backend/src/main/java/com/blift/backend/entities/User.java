package com.blift.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter                    // Generates getters for all fields
@Setter                    // Generates setters for all fields
@NoArgsConstructor         // Generates a no-argument constructor
@AllArgsConstructor        // Generates an all-arguments constructor
@ToString                  // Generates a toString() method
@Entity
@Table(name = "users")     // Maps this class to the "users" table
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

    private String profilePicture;  // Optional field for profile picture URL
    private String location;         // Optional field for location

    private boolean enabled = false; // Email verification status

    private String verificationCode;

    private LocalDateTime codeExpiryTime; // Expiry time for the code

    private String preferredLocation;

    private String preferredLanguage;
}
