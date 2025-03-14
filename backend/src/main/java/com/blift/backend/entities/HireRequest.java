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
@Table(name = "hire_requests")
public class HireRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who is hiring

    @ManyToOne
    @JoinColumn(name = "rcic_id", nullable = false)
    private Consultant rcic; // The RCIC being hired

    @Column(nullable = false)
    private String status = "Pending"; // Default status: "Pending", "Accepted", "Declined"

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp when request was created
}
