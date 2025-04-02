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
@Table(name = "hired_rcics")
public class HiredRCIC {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who hired the RCIC

    @ManyToOne
    @JoinColumn(name = "rcic_id", nullable = false)
    private Consultant rcic; // The RCIC who got hired

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp when the hire was confirmed
}
