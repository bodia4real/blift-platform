package com.blift.backend.repositories;

import com.blift.backend.entities.HiredRCIC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HiredRCICRepository extends JpaRepository<HiredRCIC, Long> {

    // Find all hired RCICs for a specific user
    List<HiredRCIC> findByUserId(Long userId);

    // Find all users assigned to a specific RCIC
    List<HiredRCIC> findByRcicId(Long rcicId);
}
