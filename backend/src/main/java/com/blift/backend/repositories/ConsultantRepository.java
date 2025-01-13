package com.blift.backend.repositories;

import com.blift.backend.entities.Consultant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {
    Optional<Consultant> findByEmail(String email);  // To find a consultant by email for login
}
